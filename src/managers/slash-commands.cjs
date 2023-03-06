const { REST, Routes } = require('discord.js');
const { getSecrets } = require('./values.cjs');
const { commands } = require('../controllers/slash-commands.cjs');
const logs = require('./logging.cjs').logging;

const pushCommands = (discordToken, clientId, guildId, commands) => {
  const rest = new REST({ version: '10' }).setToken(discordToken);
  const _commands = commands.map(slash => { return slash.command })

  rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: _commands })
    .then(() => logs.info('Discord bot commands registered.'))
    .catch(error => { 
      logs.err('An error has occured while registering commands.');
      logs.err(error);
    }); 
};

getSecrets().then(async (values) => {
  pushCommands(values.DISCORD_TOKEN,
               values.DISCORD_CLIENT_ID,
               values.DISCORD_GUILD_ID,
               commands);
});
