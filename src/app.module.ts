import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockerModule } from './modules/locker/locker.module';
import DatabaseConnection from 'src/libs/database/connection'
import Configuration from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [Configuration] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: DatabaseConnection,
      inject: [ConfigService]
    }),
    LockerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
