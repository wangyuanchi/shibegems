import { getDiscordClient } from "../discord";

export async function fetchDiscordUsername(user_id: bigint): Promise<string> {
  const userID = user_id.toString();
  let username = getDiscordClient().users.cache.get(userID)?.username;
  if (!username) {
    try {
      username = (await getDiscordClient().users.fetch(userID)).username;
    } catch {
      username = userID;
    }
  }
  return username;
}
