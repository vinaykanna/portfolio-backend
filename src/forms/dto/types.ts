import mongoose from 'mongoose';

export enum Meridiem {
  AM = 'AM',
  PM = 'PM',
}

export enum MinuteIntervals {
  'ONE' = '1',
  'FIVE' = '5',
  'TEN' = '10',
  'FIFTEEN' = '15',
  'TWENTY' = '20',
  'TWENTYFIVE' = '25',
  'THIRTY' = '30',
}

export type Range = {
  min: number;
  max: number;
  type: RangeType;
};

export enum FieldUnitPosition {
  PREFIX = 'PREFIX',
  SUFFIX = 'SUFFIX',
}

export enum CurrencyDisplay {
  CODE = 'CODE',
  SYMBOL = 'SYMBOL',
}

export enum FileSizeType {
  KB = 'KB',
  MB = 'MB',
}

export type FileMaxSize = {
  size: number;
  type: FileSizeType;
};

export type Options = Array<{
  label: string;
  value: string;
}>;

export type Countries = Array<{
  label: string;
  code: string;
  phone: string;
}>;

export type ValidationType = {
  id: string;
  format: string;
  message: string;
};

export enum FormType {
  TEMPLATE = 'TEMPLATE',
  TASK = 'TASK',
  KYB = 'KYB',
}

export enum SortBy {
  CREATED_AT = 'createdAt',
  NAME = 'name',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum FormBuilderFieldTypes {
  NAME = 'NAME',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  TIME = 'TIME',
  DATE_TIME = 'DATE_TIME',
  DECISION_BOX = 'DECISION_BOX',
  CHECKBOX = 'CHECKBOX',
  RADIO = 'RADIO',
  DROPDOWN = 'DROPDOWN',
  DROPDOWN_MULTIPLE = 'DROPDOWN_MULTIPLE',
  SINGLE_LINE = 'SINGLE_LINE',
  MULTI_LINE = 'MULTI_LINE',
  ADDRESS = 'ADDRESS',
  WEBSITE = 'WEBSITE',
  CURRENCY = 'CURRENCY',
  IMAGE_UPLOAD = 'IMAGE_UPLOAD',
  FILE_UPLOAD = 'FILE_UPLOAD',
  TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS',
  SIGNATURE = 'SIGNATURE',
  SECTION = 'SECTION',
}

export enum FormBuilderInputTypes {
  ADDRESS_LINE1 = 'ADDRESS_LINE1',
  ADDRESS_LINE2 = 'ADDRESS_LINE2',
  CITY = 'CITY',
  STATE = 'STATE',
  PINCODE = 'PINCODE',
  COUNTRY = 'COUNTRY',
  TITLE = 'TITLE',
  FIRST_NAME = 'FIRST_NAME',
  LAST_NAME = 'LAST_NAME',
  MIDDLE_NAME = 'MIDDLE_NAME',
}

export enum FieldSize {
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
}

export enum RangeType {
  DIGITS = 'DIGITS',
  VALUES = 'VALUES',
  CHARACTERS = 'CHARACTERS',
  CHOICES = 'CHOICES',
  WORDS = 'WORDS',
  FILES = 'FILES',
}

export enum AllowedDays {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export enum AllowedDates {
  ALL = 'ALL',
  PAST = 'PAST',
  FUTURE = 'FUTURE',
  CUSTOM = 'CUSTOM',
}

export const InitialTimeSchema = {
  hours: { type: String, required: true },
  minutes: { type: String, required: true },
  meridiem: { type: String, enum: Meridiem },
};

export type InitialTime = {
  hours: string;
  minutes: string;
  meridiem: Meridiem;
};

export const DateRangeSchema = {
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
};

export type DateRange = {
  startDate: string;
  endDate: string;
};

export const DecisionTextSchema = {
  checkedText: { type: String, required: false },
  uncheckedText: { type: String, required: false },
};

export type DecisionText = {
  checkedText: string;
  uncheckedText: string;
};

export const OptionsSchema = [
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
];

export const RangeSchema = new mongoose.Schema({
  min: { type: Number, required: true },
  max: { type: Number, required: true },
  type: { type: String, enum: RangeType, required: true },
});

export const UploadLimitSchema = {
  min: { type: Number, required: true },
  max: { type: Number, required: true },
};

export const FileMaxSizeSchema = new mongoose.Schema({
  type: {
    type: String,
    enun: FileSizeType,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
});

export const CountriesSchema = [
  {
    label: { type: String, required: true },
    code: { type: String, required: true },
    phone: { type: String, required: true },
  },
];

export const ValidationSchema = {
  id: { type: String, required: true },
  format: { type: String, required: true },
  message: { type: String, required: true },
};
