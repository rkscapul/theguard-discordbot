import { getSuccessResponseMessage } from './templates/success-response.js';

export class TGDCPing {
  constructor (logging, { theGuardBackendServices, serverInfo }) {
    this.logging = logging;

    this.theGuardBackendServices = theGuardBackendServices;
    this.serverInfo = serverInfo;
  }

  async run () {
    const color = '#BA68C8';
    const { players } = await this._getStatus(this.serverInfo);

    return {
      response: getSuccessResponseMessage({ color, players }),
      ephemeral: true
    }
  }

  async _getStatus (payload) {
    return await this.theGuardBackendServices.getServerStatus(payload);
  };
}