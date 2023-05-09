import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FormType } from '../dto/types';
import { Page, PageSchema } from './page.schema';

export type FormDocument = Form & Document;

@Schema({ timestamps: true })
export class Form extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ default: null })
  description: string;

  @Prop()
  tags: string[];

  @Prop({ type: [PageSchema], required: false, default: [] })
  pages: Page[];
}

export const FormSchema = SchemaFactory.createForClass(Form);
