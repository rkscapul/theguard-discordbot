import { getSuccessResponseMessage } from './templates/success-response.cjs';

export class TGDCRandomNumberGenerator {
  constructor (logging, { theGuardBackendServices }) {
    this.logging = logging;

    this.theGuardBackendServices = theGuardBackendServices;
  }

  async run () {
    const color = '#BA68C8';
    const { value, executionUuid } = await this._getRandomNumber();

    return {
      response: getSuccessResponseMessage({ color, value, executionUuid }),
      ephemeral: true
    }
  }

  async _getRandomNumber () {
    return await this.theGuardBackendServices.getRandomNumber();
  };
}