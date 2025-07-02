import { getRedisClient } from "../clients/redis";

let running = true;
const streamName = "logStream";
const consumerGroupName = "logStreamConsumerGroup";
const consumerName = "logStreamConsumer;";

export async function logStreamHandler() {
  const redisClient = getRedisClient();

  try {
    await redisClient.xGroupCreate(streamName, consumerGroupName, "0", {
      MKSTREAM: true,
    });
    console.log(`Consumer group ${consumerGroupName} created`);
  } catch (err: any) {
    if (err.message.includes("BUSYGROUP")) {
      console.log(`Consumer group ${consumerGroupName} already exists`);
    } else {
      // Don't continue with the running logic below
      throw new Error(
        `Error creating consumer group ${consumerGroupName}: ${err}`
      );
    }
  }

  // No reclaimer because logging is not cruicial
  while (running) {
    let result;

    try {
      result = await redisClient.xReadGroup(
        consumerGroupName,
        consumerName,
        { key: streamName, id: ">" },
        { COUNT: 5, BLOCK: 5000 }
      );

      if (!result) {
        continue;
      }
    } catch (err) {
      console.error("Redis Read Error:", err);
      continue;
    }

    for (const log of result[0].messages) {
      console.log(log);

      try {
        await redisClient.xAck(streamName, consumerGroupName, log.id);
      } catch (err) {
        console.error(`Failed to acknowledge log entry ${log.id}:`, err);
        continue;
      }

      try {
        const deleted = await redisClient.xDel(streamName, log.id);
        if (deleted === 0) {
          console.log(`Log entry ${log.id} was already deleted`);
        }
      } catch (err) {
        console.error(`Failed to delete log entry ${log.id}:`, err);
      }
    }
  }
}

export function stopLogStreamHandler() {
  console.log("Stopping the logStream handler...");
  running = false;
}
