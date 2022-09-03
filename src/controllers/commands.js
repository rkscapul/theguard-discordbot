import { config as isEnabled } from '../../config/commands.cjs';

import { TGDCCoordinates } from '../commands/coords/TGDCCoordinates.js';
import { TGDCPing } from '../commands/ping/TGDCPing.js';

export const getCommands = ( services, logging, payload ) => {
  return [
    {
      enabled: isEnabled.coords,
      name: 'coords',
      function: new TGDCCoordinates(logging, { theGuardBackendServices: services.backend })
    },
    {
      enabled: isEnabled.ping,
      name: 'ping',
      function: new TGDCPing(logging, { 
        theGuardBackendServices: services.backend,
        serverInfo: payload.serverInfo
      })
    }
  ];
}