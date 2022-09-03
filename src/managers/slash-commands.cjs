

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { getSecrets } = require('./values.cjs');
const { commands } = require('../controllers/slash-commands.cjs');

const pushCommands = (discordToken, clientId, guildId, commands) => {
  const rest = new REST({ version: 9 }).setToken(discordToken);
  const _commands = commands.map(slash => { return slash.command })

  rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: _commands })
    .then(() => console.log('Discord bot commands registered.'))
    .catch(error => { 
      console.log('An error has occured while registering commands.');
      console.error(error);
    });
};

getSecrets().then(async (values) => {
  pushCommands(values.DISCORD_TOKEN,
               values.DISCORD_CLIENT_ID,
               values.DISCORD_GUILD_ID,
               commands);
});
