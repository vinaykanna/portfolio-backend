import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormsController } from './controllers/form.controller';
import { Form, FormSchema } from './schemas/form.schema';
import { FormsService } from './services/forms.service';
import { AwsService } from 'src/cloud-storage/aws.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Form.name, schema: FormSchema }]),
  ],
  controllers: [FormsController],
  providers: [AwsService, FormsService],
})
export class FormsModule {}
