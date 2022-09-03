import { DIMENSION } from './constants.cjs';
import { getSuccessResponseMessage } from './templates/success-response.cjs';

export class TGDCCoordinates {
  constructor (logging, { theGuardBackendServices }) {
    this.logging = logging;

    this.theGuardBackendServices = theGuardBackendServices;
  }

  async run (payload) {
    const { dimension } = payload;
    const color = dimension === DIMENSION.nether
      ? '#E53935'
      : '#4CAF50';
    const { resultCoordinate: result, executionUuid }  
      = await this._getDimension(payload);
    const coordinates = { input: payload, result };
    
    return {
      response: getSuccessResponseMessage({ color, coordinates, executionUuid }),
      ephemeral: true
    }
  }

  async _getDimension (payload) {
    return await this.theGuardBackendServices.getCoords(payload);
  };
}