import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, FieldSchema } from './field.schema';

@Schema()
export class Page extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [FieldSchema], required: false, default: [] })
  fields: Field[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
