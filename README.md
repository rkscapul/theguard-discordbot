# theguard-discordbot
The official Discord Bot for The Inbetween SMP. This repository contains the Discord Bot "frontend".
<br>
Powered by Discord JS v14

## Pre-requisites
* AWS Account with Secret Manager.
* Discord Developer Account with created bot.

### Environment Variables
[!] WARNING [!] DO NOT commit `.env*` files to version control.

```
AWS_SECRET_ACCESS_KEY=
AWS_ACCESS_KEY_ID=
AWS_VALUE_NAME=
AWS_VALUE_REGION=

DISCORD_WEBHOOK=
```


## Setup
```
npm i
```

## Run bot locally
```
npm run sd
```

## Register commands
```
npm run cmdd
```