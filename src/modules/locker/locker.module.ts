import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LockerController } from './locker.controller';
import { LockerService } from './locker.service';
import { Locker, LockerSchema } from './schemas/locker.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Locker.name, schema: LockerSchema }])],
    controllers: [LockerController],
    providers: [LockerService],
    exports: [LockerService],
})
export class LockerModule {}
