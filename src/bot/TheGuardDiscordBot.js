import { Client, Collection, GatewayIntentBits } from 'discord.js';

import { DEFAULT_PRESENCES, PRESENCE_ACTIVITY } from '../constants/index.js';
import { randomizeArray } from '../helpers/randomize.js';

export default class TheGuardBot {
  constructor(discordPresenceInterval, mode, logging, services) {
    this.discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.discordPresenceInterval = discordPresenceInterval;
    this.logs = logging;
    this.mode = mode;
    
    this._discordPresence = {};
    this._discordPresenceActivity = {};
    this._discordPresenceIndex = 0;
    this._discordPresenceLoaded = false;
    this._inTheInbetween = true;
    
    this.services = services;

    this.discordClient.commands = new Collection();
    
    this.discordClient.once('ready', async () => { this.ready(); });
    this.discordClient.on('interactionCreate', async interaction => this.setupInteractions(interaction));
  }

  ready() {
    this.logs.info('Discord Bot started.');
    
    this._setPresence(DEFAULT_PRESENCES.startup.message, 
                      DEFAULT_PRESENCES.startup.activity);

    setTimeout(() => { this._cyclePresence(); }, this.discordPresenceInterval);            
  }

  async setupInteractions(interaction) {
    if (!interaction.isCommand()) return;

    const command = this.discordClient.commands.get(interaction.commandName);

    if (!command) return;
    if (!command.enabled) {
      interaction.reply('Command is currently disabled, please try again later');
      return;
    };

    const payload = this._getArgumentsPayload(interaction.options.data);
    const data = await command.function.run(payload);
    const { ephemeral } = data;

    interaction.reply({
      embeds: [ data.response ],
      ephemeral
    });
  }

  start(discordToken, commands) {
    this.logs.info('Starting Discord Bot...');
    
    this.discordClient.login(discordToken);

    this._setupCommands(commands);
    this._setupPresence();
  }

  async _setupCommands(commands) {
    commands.forEach(command => {
      const { enabled } = command;
      
      this.discordClient.commands.set(command.name, { enabled, function: command.function });
    });
  }

  _setPresence(message, state) {
    this.discordClient.user.setActivity(message, state);
  }

  //* Commands Management *//
  _getArgumentsPayload (data) {
    let payload = {};
    
    data.map(argument => {
      const { name, value } = argument;

      payload[name] = value;
    });

    return payload;
  }

  //* Presence Management *//
  async _setupPresence() {
    try {
      const groups = await this.services.presence.getActiveGroups();

      console.log('-');
      this.logs.info('Groups on queue:', 'BOT');

      const members = await Promise.all(groups.map(data => {
        this.logs.info(`* ${data.groupName} (${data.groupCode})`);
        return this.services.presence.getGroupMembers(data.groupCode);
      }));
      console.log('-');

      groups.map(data => { 
        const members_ = members.find(_data => _data.groupCode === data.groupCode);
        const { activity, members: members__, randomize } = members_;

        this._discordPresence[data.groupCode] = randomize ? randomizeArray(members__) : members__;
        this._discordPresenceActivity[data.groupCode] = PRESENCE_ACTIVITY[activity.toLowerCase()];
      });

      this._discordPresenceLoaded = true;

      this.logs.info('Presence data loaded.', 'BOT');
    } catch (error) {
      this.logs.err(
        'An error has occured in Discord Presence service', 
        error.code, 
        'API'
      );
    }
  }

  async _setCustomPresence() {
    const index = this._discordPresenceIndex;
    const key = Object.keys(this._discordPresence)[index];
    const groupCount = Object.keys(this._discordPresence).length
    const activity = {
      type: this._discordPresenceActivity[key],
    };
    
    this._setPresence(
      this._discordPresence[key].shift(),
      activity
    );

    if (this._discordPresence[key].length <= 5) {
      const members = await this.services.presence.getGroupMembers(key);
      const { members: members_, randomize } = members;
      const members__ = randomize ? randomizeArray(members_) : members_

      this._discordPresence[key] = this._discordPresence[key].concat(members__)

      this.logs.info(`Refilling presence data for '${key}'.`);
    }

    this._discordPresenceIndex++;
    if (this._discordPresenceIndex === groupCount) {
      this._discordPresenceIndex = 0;
    }
  }

  _cyclePresence () {
    setInterval(() => {
      if (this._inTheInbetween || !this._discordPresenceLoaded) {
        this._setPresence(
          DEFAULT_PRESENCES.default.message,
          DEFAULT_PRESENCES.default.activity
        );  
      } else {
        this._setCustomPresence();
      }

      if (!this._discordPresenceLoaded) {
        this._setupPresence();
      }

      this._inTheInbetween = !this._inTheInbetween;
    }, this.discordPresenceInterval);
  }
}