import { MessageEmbed } from 'discord.js';

export const getSuccessResponseMessage = ( payload ) => {
  const { color, coordinates, executionUuid } = payload;

  return new MessageEmbed()
    .setAuthor({ name: 'The Inbetween Guard' })
    .setTitle('Coordinates Calculator')
    .setColor(color)
    .addFields(
      {
        name: 'Entered coordinate',
        value: _getCoordinateMessage(coordinates.input),
      },
      {
        name: 'Result coordinate (this is what you need)',
        value: _getCoordinateMessage(coordinates.result),
      },
      {
        name: 'Execution ID (for operator reference)',
        value: executionUuid
      })
    .setTimestamp()
    .setFooter({ text: 'Maintained by rcoder' })
};

const _getCoordinateMessage = ( coordinates ) => {
  return `X: ${coordinates.x}, Z: ${coordinates.z}`;
};