import { Storage } from '@google-cloud/storage';
import { CloudStorage } from "./type";

export class GcpStorage implements CloudStorage {
  private gcpStorage: Storage;

  constructor({ clientEmail, privateKey, projectId }: any) {
    this.gcpStorage = new Storage();
  }

  async listFiles(bucketName: string, prefix: string): Promise<string[]> {
    const [files] = await this.gcpStorage.bucket(bucketName).getFiles({ prefix });
    const fileNames = files.map((file) => file.name);
    return fileNames;
  }

  async downloadFile(bucketName: string, fileName: string): Promise<Buffer> {
    const file = this.gcpStorage.bucket(bucketName).file(fileName);
    const [fileBuffer] = await file.download();
    return fileBuffer;
  }

  async uploadFile(bucketName: string, filePath: string, media: Buffer, fileName: string, metadata: { [key: string]: string }[]): Promise<void> {
    const metaData = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const file = this.gcpStorage.bucket(bucketName).file(fileName ?? filePath);
    const stream = file.createWriteStream();
    stream.on("finish", async () => {
      return await file.setMetadata({
        metadata: metaData,
      });
    });
    stream.end(media);
  }

  async deleteFile(bucketName: string, fileName: string): Promise<void> {
    const file = this.gcpStorage.bucket(bucketName).file(fileName);
    await file.delete();
  }
}