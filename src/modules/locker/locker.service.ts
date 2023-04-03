import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import FileManagerService from 'src/libs/fileManager/fileManager.service';
import { ILogger, Logger } from '../../libs/logging/logger';
import { Locker, LockerDocument } from './schemas/locker.schema';

type TUploadDocument = {
  filePath: string,
  media: Buffer,
  metadata: { [key: string]: string }[],
  fileName: string,
  title: string,
  mimetype: string
};

type TDocument = {
  _id: string,
  title: string,
  imageUrl: string,
  createdAt: string | boolean
};

@Injectable()
export class LockerService {
  private readonly logger: ILogger = Logger.getLogger();

  constructor(
    @InjectModel(Locker.name) private lockerModel: Model<LockerDocument>,
    private readonly FileManager: FileManagerService
  ) { }

  async uploadDocument({ filePath, media, metadata, fileName, title, mimetype }: TUploadDocument) {
    await new this.lockerModel({ name: fileName, path: filePath, user: 'Mayank kaul', title: title, mimetype }).save();
    await this.FileManager.uploadFile(filePath, media, metadata, fileName);
  }

  async getDocuments({ user, searchTerm, lastSeenId, pageSize, sortField, sortType }): Promise<TDocument[]> {

    const filter = {
      user,
      ...lastSeenId && { _id: { [sortType === 1 ? `$gt` : `$lt`]: lastSeenId } },
      ...searchTerm && { title: searchTerm },
    };

    const documents = await this.lockerModel.find(filter)
      .limit(pageSize)
      .sort({ [sortField || 'createdAt']: sortType || -1 })
      .exec();

    //change this implementation where we dont hard code base strings
    return documents.map(document => ({
      _id: document._id.toString(),
      title: document.title,
      imageUrl: `https://storage.googleapis.com/locker/${document.name}`,
      createdAt: document.createdAt,
      mimetype: document.mimetype
    }));
  }

}
