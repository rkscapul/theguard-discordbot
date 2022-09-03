import axios from 'axios';

export class TheGuardDiscordPresence {
  constructor () {
    this.presenceEndpoint = process.env.PRESENCE_ENDPOINT;
  }

  async getActiveGroups() {
    return await axios.get(`${this.presenceEndpoint}/groups/get-active`).then(res => {
      return res.data;
    });
  }

  async getGroupMembers(groupCode) {
    return await axios.get(`${this.presenceEndpoint}/groups/${groupCode}/members`).then(res => {
      return res.data;
    });
  }
}
