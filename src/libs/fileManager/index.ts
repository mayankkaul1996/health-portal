import { GcpStorage } from "./adapters/google-storage.adapter";
import { CloudStorage } from "./adapters/type";
import GCPStorageConfig from "./adapters/google-storage.config";

export enum CloudProvider  {
  GCP = 'GCP',
  AWS = 'AWS'
}

class FileManager {
  private cloudStorage: CloudStorage;
//   private configService: ConfigService;
  private bucketName: string;

  constructor(cloudProvider: CloudProvider) {
    if (cloudProvider === CloudProvider.GCP) {
        this.cloudStorage = new GcpStorage({});
        const storageConfig = GCPStorageConfig();
        this.bucketName = storageConfig.mediaBucket;
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
    return this.cloudStorage.uploadFile(this.bucketName, filePath, media, fileName, metadata);
  }

  async deleteFile(fileName: string, bucketName: string = this.bucketName): Promise<void> {
    return this.cloudStorage.deleteFile(bucketName, fileName);
  }
}

export default FileManager;