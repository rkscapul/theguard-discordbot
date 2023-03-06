const { SlashCommandBuilder } = require('discord.js');
const { details } = require('./constants.cjs');

module.exports.command = new SlashCommandBuilder()
  .setName(details.name)
  .setDescription(details.description);