import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Version,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { LockerService } from "./locker.service";
import FileManager from '../../libs/fm';

@Controller("locker")
export class LockerController {
  constructor(private readonly lockerService: LockerService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', new FileManager().upload()))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body("mediaId") mediaId: string) {
    console.log(file);
    return 'true';
  }
}
