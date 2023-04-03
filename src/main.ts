import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import * as dotenvExt from 'dotenv-extended';
import { AppModule } from './app.module';
import { ResponseBaseDTO } from './libs/core/base.dto';
import { HttpExceptionFilter } from './libs/core/http-exception.filter';
import { APILogger } from './libs/logging/api-logger';
import { Logger } from './libs/logging/logger';

const logger = Logger.getLogger();

/**
 * Main bootstraping application
 */
class Application {
	public app!: NestExpressApplication;

	static async start() {
		const application = new Application();
		await application.init();
		return application;
	}

	async init() {
		logger.info('performing application setup');
		await Environment.setup();
		const {
			env: { PORT }
		} = process;
		this.app = await NestFactory.create<NestExpressApplication>(AppModule);
		this.app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));
		this.app.use(cookieParser(process.env.JWT_SECRET));
		this.app.setGlobalPrefix('api');
		this.app.enableVersioning({
			type: VersioningType.URI,
		});
		this.app.set('trust proxy', 1);
		this.app.use(APILogger);
		this.app.useGlobalFilters(new HttpExceptionFilter());
		APIDocument.setup(this.app);
		logger.info(`starting application server on port ${PORT}`);
		this.app.listen(PORT);
	}
}

/**
 * Setup the application environment data
 */
class Environment {

	static async setup() {
		logger.info('starting app environment setup');
		dotenv.config();

		dotenvExt.load({
			schema: '.env.example',
			defaults: '.env.defaults',
			includeProcessEnv: true,
			errorOnMissing: true
		});

		logger.info('finished app environment setup');
	}
}

/**
 * OpenAPI swagger document generator
 */
class APIDocument {
	static setup(app: INestApplication) {
		logger.info('setting up swagger docs viewer');
		const options = new DocumentBuilder()
			.setTitle('Health Portal API')
			.setDescription(
				`The Health Portal API exposes Health Portal core features as an API for clients to consume.`
			)
			.build();
		const document = SwaggerModule.createDocument(app, options, { extraModels: [ResponseBaseDTO], ignoreGlobalPrefix: true });
		const customOptions: SwaggerCustomOptions = {
			customSiteTitle: 'Health Portal API spec'
		};
		SwaggerModule.setup('docs', app, document, customOptions);
	}
}

/**
 * Start application
 */
Application.start()
	.then(() => logger.info('application started'))
	.catch(error => logger.error('error starting the application', error));
