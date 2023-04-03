import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FileManagerModule } from 'src/libs/fileManager/fileManager.module';
import { LockerController } from './locker.controller';
import { LockerService } from './locker.service';
import { Locker, LockerSchema } from './schemas/locker.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Locker.name, schema: LockerSchema }]),
        FileManagerModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                cloudProvider: configService.get('fileManager.cloudProvider'),
                mediaBucket: configService.get('fileManager.storage.locker_document_bucket')
            }),
        }),
    ],
    controllers: [LockerController],
    providers: [LockerService],
    exports: [LockerService],
})
export class LockerModule {}
