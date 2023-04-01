import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Version,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ResponseInterceptor } from "src/libs/core/response.interceptor";
import { ILogger, Logger } from "src/libs/logging/logger";
import { GetDocumentsDto, UploadToLockerDto } from "./dto/locker.dto";
import { LockerService } from "./locker.service";

@Controller("locker")
@UseInterceptors(ResponseInterceptor)
export class LockerController {
  constructor(private readonly lockerService: LockerService) { }
  private readonly logger: ILogger = Logger.getLogger();
  
  @Post('upload')
  @Version('1')
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      files: 1,
      // fileSize: 1024 * 1024, (Todo: Define the file size. As of now there no limit)
    },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() { title }: UploadToLockerDto) {
    this.logger.info(`[src][modules][locker][controller][uploadFile][start] title :- ${title}`);
    await this.lockerService.uploadDocument({
      title: title,
      filePath: `locker/${title}`,
      media: file.buffer,
      fileName: file.originalname,
      metadata: [{ mediaId: title }],
      mimetype: file.mimetype
    });
    return { title };
  }

  @Get('documents')
  @Version('1')
  async getDocuments(@Query() { searchTerm, lastSeenId, pageSize, sortField, sortType }: GetDocumentsDto) {
    this.logger.info(`[src][modules][locker][controller][getDocuments][start]`);
    return await this.lockerService.getDocuments({ user: 'Mayank kaul', searchTerm, lastSeenId, pageSize, sortField, sortType });
  }
  
}
