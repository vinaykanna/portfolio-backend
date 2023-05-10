import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormsController } from './controllers/form.controller';
import { Form, FormSchema } from './schemas/form.schema';
import { FormsService } from './services/forms.service';
import { AwsService } from 'src/cloud-storage/aws.service';
import {
  FormResponse,
  FormResponseSchema,
} from './schemas/form-response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Form.name, schema: FormSchema },
      { name: FormResponse.name, schema: FormResponseSchema },
    ]),
  ],
  controllers: [FormsController],
  providers: [AwsService, FormsService],
})
export class FormsModule {}
