// import { details } from './constants.js';
// import { slash } from './slash-command.js';

// import { TGDCPing } from './TGDCPing.js';

// const command = {
//   ...details,
//   slash
// }

// export { 
//   command,
//   TGDCPing
// }

import { details } from './constants.cjs';
import { command } from './slash-command.cjs'
import { TGDCPing } from './TGDCPing.js';

export { command, details, TGDCPing };