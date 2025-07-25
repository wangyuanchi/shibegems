[![banner.png](/banner.png)](https://discord.com/oauth2/authorize?client_id=1378311804710551692&permissions=68608&integration_type=0&scope=bot+applications.commands)

## Table of Contents

1. [About](#about)
2. [Tech Stack](#tech-stack)
3. [Environment Variables](#environment-variables)

---

## About

shibegems is a discord bot that rewards user activity within a server.

Every time you send a message, you have a chance to find a gem.

**Use your gems to:**

- Buy items which increase your gem chance
- Trade for gems that are lower or higher in rarity
- Climb up the networth and gemstone leaderboards

**You can invite shibegems to your discord server [here](https://discord.com/oauth2/authorize?client_id=1378311804710551692&permissions=68608&integration_type=0&scope=bot+applications.commands).**

Use `/tutorial` to know more about how the bot works!

## Tech Stack

![My Skills](https://skillicons.dev/icons?i=ts,go,prisma,redis,postgres,docker)

The bot is written using the `discord.js` library.

It is currently hosted on `AWS EC2` and there are `Cron` jobs for logging and database backups to `AWS S3`.

## Environment Variables

| Variable Name      | Directory  | Additional Notes                                 |
| :----------------- | :--------- | :----------------------------------------------- |
| CLIENT_ID          | ./bot      | Bot Application ID                               |
| DEV_GUILD_ID       | ./bot      | Development Discord Server ID ("" in Production) |
| TOKEN              | ./bot      | Discord Bot Token                                |
| REDIS_URL          | ./bot      | Redis Database URL                               |
| DATABASE_URL       | ./bot      | Postgres Database URL (Prisma)                   |
| REDIS_URL          | ./pipeline | Redis Database URL                               |
| POSTGRES_URL       | ./pipeline | Postgres Database URL                            |
| RUN_DATA_MIGRATION | ./pipeline | Either "true" or "false" (Run only once)         |
| POSTGRES_USER      | .          | Postgres Username                                |
| POSTGRES_PASSWORD  | .          | Postgres Password                                |
| POSTGRES_DB        | .          | Postgres Database Name                           |
