// eslint-disable-next-line @typescript-eslint/no-var-requires
const winston = require('winston');
const process = require('process');

/**
 * custom print format for winston
 */
const printFormat = winston.format.printf(
	({ level, message, label = '', timestamp }) => {
		return `[${label}] ${process.pid} - ${timestamp} ${level} ${message}`;
	}
);

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	defaultMeta: { service: 'health-portal' },
	transports: [
		new winston.transports.Console({
			level: 'info',
			format: winston.format.combine(
				winston.format.label({ label: 'Application' }),
				winston.format.timestamp(),
				printFormat
			)
		})
	]
});
export interface ILogger {
	getFileStream(): any;
	info(message: string, ...meta: any[]): void;
	warn(message: string, ...meta: any[]): void;
	debug(message: string, ...meta: any[]): void;
	verbose(message: string, ...meta: any[]): void;
	error(message: string, ...meta: any[]): void;
}

export class Logger implements ILogger {
	static getLogger(): ILogger {
		const logger = new Logger();
		return logger;
	}

	getFileStream() {
		return logger.stream.write;
	}

	info(message: string, ...meta: any[]): void {
		logger.info(message, ...meta);
	}
	warn(message: string, ...meta: any[]): void {
		logger.warn(message, ...meta);
	}
	debug(message: string, ...meta: any[]): void {
		logger.debug(message, ...meta);
	}
	verbose(message: string, ...meta: any[]): void {
		logger.verbose(message, ...meta);
	}
	error(message: string, ...meta: any[]): void {
		logger.error(message, ...meta);
	}
}
