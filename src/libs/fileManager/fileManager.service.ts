import { GcpStorage } from "./adapters/google-storage.adapter";
import { CloudProvider, CloudStorage, FileManagerConfigOptions, IFileManagerConfig,  } from "./fileManager.type";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
class FileManagerService {
  private cloudStorage: CloudStorage;
  private bucketName: string;

  constructor(@Inject(FileManagerConfigOptions) private readonly config: IFileManagerConfig) {
    if (config.cloudProvider === CloudProvider.GCP) {
        this.cloudStorage = new GcpStorage({});
        this.bucketName = config.mediaBucket;
    } 
  }

  setCloudProvider(provider: CloudStorage) {
    this.cloudStorage = provider;
  }

  async listFiles(prefix: string, bucketName: string = this.bucketName): Promise<string[]> {
    return this.cloudStorage.listFiles(bucketName, prefix);
  }

  async downloadFile(fileName: string, bucketName: string = this.bucketName): Promise<Buffer> {
    return this.cloudStorage.downloadFile(bucketName, fileName);
  }

  async uploadFile(filePath: string, media: Buffer, metadata: { [key: string]: string }[], fileName: string, bucketName: string = this.bucketName): Promise<void> {
    return this.cloudStorage.uploadFile(bucketName, filePath, media, fileName, metadata);
  }

  async deleteFile(fileName: string, bucketName: string = this.bucketName): Promise<void> {
    return this.cloudStorage.deleteFile(bucketName, fileName);
  }
}

export default FileManagerService;