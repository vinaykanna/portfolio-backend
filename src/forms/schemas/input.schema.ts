import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  FieldSize,
  FormBuilderInputTypes,
  Options,
  OptionsSchema,
  Range,
  RangeSchema,
} from '../dto/types';
import { Document, Schema as MangooseSchema } from 'mongoose';

@Schema()
export class Input extends Document {
  @Prop({ required: true })
  label: string;

  @Prop({ type: MangooseSchema.Types.Mixed, required: false, default: null })
  value: any;

  @Prop({ default: false })
  required: boolean;

  @Prop({ default: false })
  hide: boolean;

  @Prop({ required: false })
  placeHolder: string;

  @Prop({ required: false })
  defaultValue: string;

  @Prop({ enum: FormBuilderInputTypes, required: true })
  inputType: FormBuilderInputTypes;

  @Prop({ enum: FieldSize, required: false, default: FieldSize.SMALL })
  inputSize: FieldSize;

  @Prop({ type: RangeSchema, required: false })
  range: Range;

  @Prop({ type: raw(OptionsSchema), required: false, default: undefined })
  options: Options;
}

export const InputSchema = SchemaFactory.createForClass(Input);
