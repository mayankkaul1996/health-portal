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
