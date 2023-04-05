import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  SetMetadata,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Version,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ResponseInterceptor } from "src/libs/core/response.interceptor";
import { ILogger, Logger } from "src/libs/logging/logger";
import { JWTGuard } from "../auth/jwt.guard"; 
import { GetUser } from "../auth/user.decorator";
import { UserDocument } from "../user/schemas/user.schema";
import { GetDocumentsDto, UploadToLockerDto } from "./dto/locker.dto";
import { LockerService } from "./locker.service";


@Controller('locker')
@UseGuards(JWTGuard)
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
  async uploadFile(@GetUser() user: UserDocument, @UploadedFile() file: Express.Multer.File, @Body() { title }: UploadToLockerDto) {
    this.logger.info(`[src][modules][locker][controller][uploadFile][start] title :- ${title}`);
    const userId = user._id.toString();
    await this.lockerService.uploadDocument({
      title: title,
      filePath: `locker/${userId}/${file.originalname}`,
      media: file.buffer,
      fileName: file.originalname,
      metadata: [{ mediaId: title }],
      mimetype: file.mimetype,
      userId: userId
    });
    return { title };
  }

  @Get('documents')
  @Version('1')
  async getDocuments(@GetUser() user: UserDocument, @Query() { searchTerm, lastSeenId, pageSize, sortField, sortType }: GetDocumentsDto) {
    this.logger.info(`[src][modules][locker][controller][getDocuments][start]`);
    return await this.lockerService.getDocuments({ user: user._id.toString(), searchTerm, lastSeenId, pageSize, sortField, sortType });
  }

  @Get('document/:fileName')
  @Version('1')
  @SetMetadata('stream', true)
  async getDocumentBuffer(@Param('fileName') fileName: string) {
    this.logger.info(`[src][modules][locker][controller][getDocumentBuffer][start]`);
    const readStream = await this.lockerService.getDocument(fileName);
    return new StreamableFile(readStream);
  }

}
