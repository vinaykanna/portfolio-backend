import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MangooseSchema } from 'mongoose';

export type FormResponseDocument = FormResponse & Document;

@Schema({ timestamps: true })
export class FormResponse extends Document {
  @Prop({ type: MangooseSchema.Types.ObjectId, required: true })
  formId: string;

  @Prop({ type: MangooseSchema.Types.Mixed, required: true })
  response: any;
}

export const FormResponseSchema = SchemaFactory.createForClass(FormResponse);
