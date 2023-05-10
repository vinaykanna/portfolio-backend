import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AddFieldDto } from '../dto/add-field.dto';
import { AddPageDto } from '../dto/add-page.dto';
import CloneFormDto from '../dto/clone-form.dto';
import CreateFormDto, { UpdateFormDto } from '../dto/create-form.dto';
import { UpdateFieldDto } from '../dto/update-field.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
import { FormsService } from '../services/forms.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('forms')
export class FormsController {
  constructor(private service: FormsService) {}

  @Post()
  async createForm(@Body() body: CreateFormDto) {
    return this.service.createForm(body);
  }

  @Get()
  async getForms() {
    return this.service.getAllForms();
  }

  @Post('/upload-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.service.uploadFile(file);
  }

  @Post(':id/submit-response')
  async submitResponse(@Param('id') id: string, @Body() body: any) {
    return this.service.submitResponse(id, body);
  }

  @Get(':id/responses')
  async getFormRespones(@Param('id') id: string) {
    return this.service.getFormResponses(id);
  }

  @Put(':id')
  async updateForm(@Body() body: UpdateFormDto, @Param('id') id: string) {
    return this.service.updateForm(id, body);
  }

  @Post(':id/clone')
  async cloneForm(@Param('id') id: string, @Body() body: CloneFormDto) {
    return this.service.cloneForm(id, body);
  }

  @Get('/default')
  async getDefaultForms() {
    return this.service.getDefaultForms();
  }

  @Get(':formId')
  async getForm(@Param('formId') formId: string) {
    return this.service.getForm(formId);
  }

  @Delete(':formId')
  async deleteForm(@Param('formId') formId: string) {
    return this.service.deleteForm(formId);
  }

  @Post(`/:formId/pages`)
  async addPage(@Body() body: AddPageDto, @Param('formId') formId: string) {
    return this.service.addPage(formId, body);
  }

  @Post(`/:formId/pages/:pageId/clone`)
  async clonePage(
    @Param('formId') formId: string,
    @Param('pageId') pageId: string,
  ) {
    return this.service.clonePage(formId, pageId);
  }

  @Patch(`/:formId/pages/:pageId`)
  async updatePage(
    @Body() body: UpdatePageDto,
    @Param('formId') formId: string,
    @Param('pageId') pageId: string,
  ) {
    return this.service.updatePage(formId, pageId, body);
  }

  @Delete(`/:formId/pages/:pageId`)
  async deletePage(
    @Param('formId') formId: string,
    @Param('pageId') pageId: string,
  ) {
    return this.service.deletePage(formId, pageId);
  }

  @Post(':formId/pages/:pageId/fields')
  async addField(
    @Param('formId') formId: string,
    @Param('pageId') pageId: string,
    @Body() body: AddFieldDto,
  ) {
    return this.service.addField(formId, pageId, body);
  }

  @Patch(':formId/pages/:pageId/fields/:fieldId')
  async updateField(
    @Param('formId') formId: string,
    @Param('pageId') pageId: string,
    @Param('fieldId') fieldId: string,
    @Body() body: UpdateFieldDto,
  ) {
    return this.service.updateField(formId, pageId, fieldId, body);
  }

  @Delete(':formId/pages/:pageId/fields/:fieldId')
  async deleteField(
    @Param('formId') formId: string,
    @Param('pageId') pageId: string,
    @Param('fieldId') fieldId: string,
  ) {
    return this.service.deleteField(formId, pageId, fieldId);
  }
}
