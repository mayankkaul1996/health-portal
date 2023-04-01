import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default (configService: ConfigService): TypeOrmModuleOptions => {
	const options: TypeOrmModuleOptions = {
		type: 'postgres',
		host: configService.get('database.host'),
		port: +configService.get<number>('database.port'),
		username: configService.get('database.user'),
		password: configService.get('database.password'),
		database: configService.get('database.name'),
		entities: [
			
		],
		synchronize: false
	};
	return options;
};