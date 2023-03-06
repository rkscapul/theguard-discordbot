const { EmbedBuilder } = require('discord.js');

module.exports.getSuccessResponseMessage = ( payload ) => {
  const { color, value: randomNumber, executionUuid } = payload;

  return new EmbedBuilder()
    .setAuthor({ name: 'The Inbetween Guard' })
    .setTitle('Random Number Generator')
    .setColor(color)
    .addFields(
      {
        name: 'The number is...',
        value: randomNumber.toString(),
      },
      {
        name: 'Execution ID (for operator reference)',
        value: `${executionUuid}`,
      })
    .setTimestamp()
    .setFooter({ text: 'Maintained by rcoder' })
};