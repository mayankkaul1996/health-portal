import { DynamicModule, Module } from '@nestjs/common';
import FileManagerService from './fileManager.service';
import { FileManagerConfig, FileManagerConfigOptions } from './fileManager.type';

@Module({})
export class FileManagerModule {
    static registerAsync(config: FileManagerConfig): DynamicModule {
        return {
            module: FileManagerModule,
            imports: config.imports,
            providers: [{
                provide: FileManagerConfigOptions,
                useFactory: config.useFactory,
                inject: config.inject
            },
                FileManagerService
            ],
            exports: [FileManagerService],
        };
    }
};
