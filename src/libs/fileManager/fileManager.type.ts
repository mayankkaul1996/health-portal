import { FactoryProvider, ModuleMetadata } from "@nestjs/common";

export interface CloudStorage {
  listFiles(bucketName: string, prefix: string): Promise<string[]>;
  downloadFile(bucketName: string, fileName: string): Promise<Buffer>;
  uploadFile(
    bucketName: string,
    filePath: string,
    media: Buffer,
    fileName: string,
    metadata: { [key: string]: string }[],
  ): Promise<void>;
  deleteFile(bucketName: string, fileName: string): Promise<void>;
}

export enum CloudProvider  {
  GCP = 'GCP',
  AWS = 'AWS'
}

export const FileManagerConfigOptions = 'Config';

export interface IFileManagerConfig {
  cloudProvider: CloudProvider,
  mediaBucket: string
}

export type FileManagerConfig = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<IFileManagerConfig>, 'useFactory' | 'inject'>;