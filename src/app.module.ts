import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LockerModule } from './modules/locker/locker.module';
import Configuration from 'src/config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './libs/database/mongoose.connection';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [Configuration] }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService, 
      inject: [ConfigService]
    }),
    LockerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
