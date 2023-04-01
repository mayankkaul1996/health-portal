import { ILogger, Logger } from './logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const morgan = require('morgan');

const logger: ILogger = Logger.getLogger();
export const APILogger = morgan('combined', {
	stream: <any>logger.getFileStream()
});
