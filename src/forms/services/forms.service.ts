import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddFieldDto } from '../dto/add-field.dto';
import { AddPageDto } from '../dto/add-page.dto';
import CloneFormDto from '../dto/clone-form.dto';
import CreateFormDto, { UpdateFormDto } from '../dto/create-form.dto';
import { FormType } from '../dto/types';
import { UpdateFieldDto } from '../dto/update-field.dto';
import { UpdatePageDto } from '../dto/update-page.dto';
import { Form, FormDocument } from '../schemas/form.schema';
import { Page } from '../schemas/page.schema';
import { AwsService } from 'src/cloud-storage/aws.service';
import { UploadRes } from 'src/cloud-storage/cloud-storage.service';
import {
  FormResponse,
  FormResponseDocument,
} from '../schemas/form-response.schema';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form.name) private formModel: Model<FormDocument>,
    @InjectModel(FormResponse.name)
    private formResponseModel: Model<FormResponseDocument>,
    private awsService: AwsService,
  ) {}

  async createForm(data: CreateFormDto) {
    try {
      let form = new this.formModel({ ...data });
      await form.save();
      return form;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  async updateForm(id: string, data: UpdateFormDto) {
    try {
      let form = await this.formModel.findById(id);
      form.set(data);
      await form.save();
      return form;
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  async cloneForm(id: string, body: CloneFormDto) {
    let form = await this.formModel.findById(id);

    let clonedForm = JSON.stringify(form, (key, value) => {
      if (key === '_id') {
        return undefined;
      }
      if (key === '__v') {
        return undefined;
      }
      return value;
    });

    let parsedForm = JSON.parse(clonedForm);

    let newForm = new this.formModel(parsedForm);
    await newForm.save();
    return newForm;
  }

  async getAllForms() {
    let forms = await this.formModel.find();

    return forms;
  }

  async getDefaultForms() {
    let forms = await this.formModel.find({
      type: FormType.TEMPLATE,
      defaultOne: true,
    });

    return forms;
  }

  async getForm(formId: string) {
    let form = await this.formModel.findById(formId);

    if (!form) {
      throw new BadRequestException('Form not found');
    }

    return form;
  }

  async deleteForm(formId: string) {
    let form = await this.formModel.findById(formId);

    if (!form) {
      throw new BadRequestException('Form not found');
    }

    await form.deleteOne();
    return form;
  }

  async addPage(formId: string, data: AddPageDto) {
    let form = await this.formModel.findById(formId);

    if (!form) {
      throw new BadRequestException('Form not found');
    }

    form.pages.push(data as Page);

    await form.save();
    return form;
  }

  async clonePage(formId: string, pageId: string) {
    let form = await this.formModel.findById(formId);
    let page = form.pages.find((page) => page.id === pageId);

    let clonePage = JSON.stringify(page, (key, value) => {
      if (key === '_id') {
        return undefined;
      }
      if (key === '__v') {
        return undefined;
      }
      return value;
    });

    let parsedPage = JSON.parse(clonePage);

    form.pages.push(parsedPage);

    await form.save();

    return form;
  }

  async updatePage(formId: string, pageId: string, data: UpdatePageDto) {
    let form = await this.formModel.findById(formId);

    if (!form) {
      throw new BadRequestException('Form not found');
    }

    let page = form.pages.find((p) => p._id?.toString() === pageId);

    if (!page) {
      throw new BadRequestException('Page not found');
    }

    if (data.name) {
      page.name = data.name;
    }

    if (data.fields) {
      page.fields = data.fields;
    }

    await form.save();
    return form;
  }

  async deletePage(formId: string, pageId: string) {
    let form = await this.formModel.findById(formId);

    if (!form) {
      throw new BadRequestException('Form not found');
    }

    let page = form.pages.find((p) => p._id?.toString() === pageId);

    if (!page) {
      throw new BadRequestException('Page not found');
    }

    page.deleteOne();

    await form.save();

    return form;
  }

  async addField(formId: string, pageId: string, data: AddFieldDto) {
    try {
      let form = await this.formModel.findById(formId);

      if (!form) {
        throw new BadRequestException('Form not found');
      }

      let page = form.pages.find((p) => p._id?.toString() === pageId);

      if (!page) {
        throw new BadRequestException('Page not found');
      }

      page.fields.push(data as any);
      await form.save();
      return form;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateField(
    formId: string,
    pageId: string,
    fieldId: string,
    data: UpdateFieldDto,
  ) {
    let form = await this.formModel.findById(formId);

    if (!form) {
      throw new BadRequestException('Form not found');
    }

    let page = form.pages.find((p) => p._id?.toString() === pageId);

    if (!page) {
      throw new BadRequestException('Page not found');
    }

    let field = page.fields.find((f) => f._id?.toString() === fieldId);

    if (!field) {
      throw new BadRequestException('Field not found');
    }

    Object.assign(field, data);

    return form.save();
  }

  async deleteField(formId: string, pageId: string, fieldId: string) {
    let form = await this.formModel.findById(formId);

    if (!form) {
      throw new BadRequestException('Form not found');
    }

    let page = form.pages.find((p) => p._id?.toString() === pageId);

    if (!page) {
      throw new BadRequestException('Form Page not found');
    }

    let field = page.fields.find((f) => f._id?.toString() === fieldId);

    if (!field) {
      throw new BadRequestException('Form Field not found');
    }

    field.deleteOne();
    return form.save();
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      let upload: UploadRes = await this.awsService.upload(file);
      return upload;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async submitResponse(formId: string, data: any) {
    const formResponse = new this.formResponseModel({
      formId,
      response: data,
    });

    await formResponse.save();
    return formResponse;
  }

  async getFormResponses(formId: string) {
    let form = await this.formModel.findById(formId);

    if (!form) {
      throw new BadRequestException('Form not found');
    }

    let responses = await this.formResponseModel.find({ formId });

    return {
      formDetails: form,
      responses,
    };
  }
}
