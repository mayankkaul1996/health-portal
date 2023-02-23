import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LockerController } from './locker.controller';
import { LockerService } from './locker.service';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [LockerController],
    providers: [LockerService],
    exports: [LockerService],
})
export class LockerModule {}
