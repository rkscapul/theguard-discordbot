const coords = require('../commands/coords/slash-command.cjs');
const ping = require('../commands/ping/slash-command.cjs');
const rng = require('../commands/random-number-generator/slash-command.cjs');

module.exports.commands = [
  {
    command: coords.command,
  },
  {
    command: ping.command,
  },
  {
    command: rng.command,
  }
];