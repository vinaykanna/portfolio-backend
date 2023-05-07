import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CloudStorageService, IUploadBody } from './cloud-storage.service';
import CreateFolderDto from './dto/create-folder.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RenameFileDto } from './dto/rename-file.dto';
import MoveFileDto from './dto/move-file.dto';

@Controller('projects/cloud-storage')
export class CloudStorageController {
  constructor(private readonly service: CloudStorageService) {}

  @Get()
  getStorage(@Query() query: any) {
    return this.service.getStorage(query);
  }

  @Post('/create-folder')
  createFolder(@Body() body: CreateFolderDto) {
    return this.service.createFolder(body);
  }

  @Post('/upload-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: IUploadBody,
  ) {
    return this.service.uploadFile({ file, body });
  }

  @Delete('/remove-file/:id')
  removeFile(@Param('id', ParseIntPipe) id: number) {
    return this.service.removeFile(id);
  }

  @Post('/rename-file')
  renameFile(@Body() body: RenameFileDto) {
    return this.service.renameFile(body);
  }

  @Put('/move-file')
  async moveFile(@Body() body: MoveFileDto) {
    return this.service.moveFile(body);
  }
}
