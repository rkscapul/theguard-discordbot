import './managers/variables.cjs';

import { printHeader }  from './helpers/display.js';

import { getSecrets }   from './managers/values.cjs';
import { getCommands }  from './controllers/commands.js';

import { logging as logs } from './managers/logging.cjs';

import { 
  TheGuardBackendServices 
} from './services/backend-services/TheGuardBackendServices.js';
import { 
  TheGuardDiscordPresence 
} from './services/presence-service/TheGuardDiscordPresence.js';
import TheGuardBot      from './bot/TheGuardDiscordBot.js';

printHeader();

getSecrets()
  .then(values => {
    const services = {
      backend: new TheGuardBackendServices(),
      presence: new TheGuardDiscordPresence(),
    }

    const commands = getCommands(services, logs, {
      serverInfo: JSON.parse(values.SERVER_INFO)
    });

    const theGuardDiscordBot = new TheGuardBot(
      values.DISCORD_PRESENCE_INTERVAL,
      values.DISCORD_COMMAND_PREFIX,
      logs,
      services
    );

    theGuardDiscordBot.start(values.DISCORD_TOKEN, commands);
  })
  .catch(err => {
    logs.err(err);
  });
