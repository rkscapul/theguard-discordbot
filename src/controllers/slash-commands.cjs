const coords = require('../commands/coords/slash-command.cjs');
const ping = require('../commands/ping/slash-command.cjs');

module.exports.commands = [
  {
    command: coords.command,
  },
  {
    command: ping.command,
  }
];