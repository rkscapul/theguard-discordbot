const { SlashCommandBuilder } = require('discord.js');
const { details, DIMENSION } = require('./constants.cjs');

module.exports.command = new SlashCommandBuilder()
  .setName(details.name)
  .setDescription(details.description)
  .addStringOption(option => 
    option.setName('dimension')
          .setDescription('The dimension you\'re going to use this coordinate.')
          .setRequired(true)
          .addChoices(
            { name: 'nether', value: DIMENSION.nether },
            { name: 'overworld', value: DIMENSION.overworld }
          ))
  .addIntegerOption(option => 
    option.setName('x')
          .setDescription('x coordinate')
          .setRequired(true))
  .addIntegerOption(option => 
    option.setName('z')
          .setDescription('z coordinate')
          .setRequired(true));