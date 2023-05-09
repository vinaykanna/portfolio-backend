import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MangooseSchema } from 'mongoose';
import {
  AllowedDates,
  Countries,
  CountriesSchema,
  CurrencyDisplay,
  DateRange,
  DateRangeSchema,
  DecisionText,
  DecisionTextSchema,
  FieldSize,
  FileMaxSize,
  FileMaxSizeSchema,
  FormBuilderFieldTypes,
  InitialTime,
  InitialTimeSchema,
  Meridiem,
  MinuteIntervals,
  Options,
  OptionsSchema,
  Range,
  RangeSchema,
} from '../dto/types';
import { Input, InputSchema } from './input.schema';

@Schema()
export class Field extends Document {
  @Prop({ required: true })
  label: string;

  @Prop({ default: false })
  required: boolean;

  @Prop({ required: false })
  placeHolder: string;

  @Prop({ type: MangooseSchema.Types.Mixed, required: false })
  defaultValue: any;

  @Prop({ required: false })
  instructions: string;

  @Prop({ required: false })
  description: string;

  @Prop({ enum: FieldSize, required: false, default: FieldSize.SMALL })
  fieldSize: FieldSize;

  @Prop({ enum: FormBuilderFieldTypes, required: true })
  fieldType: FormBuilderFieldTypes;

  @Prop({ type: RangeSchema, required: false })
  range: Range;

  @Prop({ type: raw(OptionsSchema), required: false, default: undefined })
  options: Options;

  @Prop({ type: [InputSchema], required: false, default: undefined })
  inputs: Input[];

  @Prop({ type: raw(DecisionTextSchema), required: false })
  decisionText: DecisionText;

  @Prop({ type: String, required: false })
  displayColumns: string;

  @Prop({ required: false })
  showCharacterCount: boolean;

  @Prop({
    type: raw(OptionsSchema),
    required: false,
    default: undefined,
  })
  allowedDays: Options;

  @Prop({ enum: AllowedDates, required: false })
  allowedDates: AllowedDates;

  @Prop({ type: raw(DateRangeSchema), required: false })
  dateRange: DateRange;

  @Prop({ enum: Meridiem, required: false })
  timeFormat: Meridiem;

  @Prop({ enum: MinuteIntervals, required: false })
  minuteIterval: MinuteIntervals;

  @Prop({ type: raw(InitialTimeSchema), required: false })
  initialValueTime: InitialTime;

  @Prop({ required: false })
  currencyType: string;

  @Prop({ enum: CurrencyDisplay, required: false })
  currencyDisplay: CurrencyDisplay;

  @Prop({ type: String, required: false })
  termsAndConditions: string;

  @Prop({ type: Boolean, required: false })
  includeCountryCode: boolean;

  @Prop({ type: raw(CountriesSchema), required: false, default: undefined })
  allowedCountries: Countries;

  @Prop({ required: false })
  defaultCountryCode: string;

  @Prop({
    type: raw(OptionsSchema),
    required: false,
    default: undefined,
  })
  uploadFileTypes: Options;

  @Prop({ type: FileMaxSizeSchema, required: false })
  fileMaxSize: FileMaxSize;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
