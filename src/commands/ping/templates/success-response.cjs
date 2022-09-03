const { EmbedBuilder } = require('discord.js');

module.exports.getSuccessResponseMessage = ( payload ) => {
  const { color, players } = payload;

  return new MessageEmbed()
    .setAuthor({ name: 'The Inbetween Guard' })
    .setTitle('Server Ping')
    .setColor(color)
    .addFields(
      {
        name: `Online Players: ${players.online}/${players.max}`,
        value: '\u200B',
      },
      {
        name: 'Execution ID (for operator reference)',
        value: 'executionUuid'
      })
    .setTimestamp()
    .setFooter({ text: 'Maintained by rcoder' })
};