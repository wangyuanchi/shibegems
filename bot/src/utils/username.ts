import { getDiscordClient } from "../clients/discord";

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
  if (username.startsWith("deleted_user_")) {
    username = "Deleted User";
  }
  return username;
}
