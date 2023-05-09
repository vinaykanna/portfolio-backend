import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import {
  AllowedDates,
  CurrencyDisplay,
  FieldSize,
  FormBuilderFieldTypes,
} from '../types';
import { AllowedCountriesDto } from './allowed-countries.dto';
import { DateRangeDto } from './date-range.dto';
import { FileMaxSizeDto } from './file-max-size.dto';
import { InputDto, Option } from './input.dto';
import { RangeDto } from './range.dto';

export class AddFieldDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  @IsEnum(FieldSize)
  fieldSize: FieldSize;

  @IsNotEmpty()
  @IsEnum(FormBuilderFieldTypes)
  fieldType: FormBuilderFieldTypes;

  @IsOptional()
  @IsString()
  placeHolder: string;

  @IsNotEmpty()
  @IsBoolean()
  required: boolean;

  @ValidateIf((data: AddFieldDto) => {
    return (
      data.fieldType === FormBuilderFieldTypes.DROPDOWN_MULTIPLE ||
      data.fieldType === FormBuilderFieldTypes.DROPDOWN ||
      data.fieldType === FormBuilderFieldTypes.RADIO ||
      data.fieldType === FormBuilderFieldTypes.CHECKBOX
    );
  })
  @IsNotEmpty()
  @Type(() => Option)
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  options: Option[];

  @ValidateIf(
    (data: AddFieldDto) => data.fieldType === FormBuilderFieldTypes.MULTI_LINE,
  )
  @IsNotEmpty()
  @IsBoolean()
  showCharacterCount: boolean;

  @ValidateIf(
    (data: AddFieldDto) => data.fieldType === FormBuilderFieldTypes.PHONE,
  )
  @IsNotEmpty()
  @IsBoolean()
  includeCountryCode: boolean;

  @ValidateIf(
    (data: AddFieldDto) =>
      data.fieldType === FormBuilderFieldTypes.PHONE &&
      data.includeCountryCode === true,
  )
  @IsNotEmpty()
  @IsArray()
  @Type(() => AllowedCountriesDto)
  @ValidateNested()
  allowedCountries: AllowedCountriesDto[];

  @ValidateIf((data: AddFieldDto) => {
    return (
      data.fieldType === FormBuilderFieldTypes.PHONE &&
      data.includeCountryCode === true
    );
  })
  @IsNotEmpty()
  @IsString()
  defaultCountryCode: string;

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.FILE_UPLOAD;
  })
  @IsNotEmpty()
  @Type(() => FileMaxSizeDto)
  @ValidateNested({ message: 'File max size must be an object' })
  fileMaxSize: FileMaxSizeDto;

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.FILE_UPLOAD;
  })
  @IsNotEmpty()
  @Type(() => Option)
  @ValidateNested()
  @IsArray()
  uploadFileTypes: Option[];

  @ValidateIf((data: AddFieldDto) => {
    return (
      data.fieldType === FormBuilderFieldTypes.CHECKBOX ||
      data.fieldType === FormBuilderFieldTypes.RADIO
    );
  })
  @IsNotEmpty()
  @IsString()
  displayColumns: string;

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.DATE;
  })
  @IsNotEmpty()
  @Type(() => Option)
  @ValidateNested()
  @IsArray()
  allowedDays: Option[];

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.DATE;
  })
  @IsNotEmpty()
  @IsEnum(AllowedDates)
  allowedDates: string;

  @ValidateIf((data: AddFieldDto) => {
    return data.allowedDates === AllowedDates.CUSTOM;
  })
  @IsNotEmpty()
  @Type(() => DateRangeDto)
  @ValidateNested()
  dateRange: DateRangeDto;

  @ValidateIf((data: AddFieldDto) => {
    return (
      data.fieldType === FormBuilderFieldTypes.PHONE ||
      data.fieldType === FormBuilderFieldTypes.FILE_UPLOAD ||
      data.fieldType === FormBuilderFieldTypes.IMAGE_UPLOAD
    );
  })
  @IsNotEmpty()
  @Type(() => RangeDto)
  @ValidateNested({ message: 'Range must be an object' })
  range: RangeDto;

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.CURRENCY;
  })
  @IsNotEmpty()
  currencyType: string;

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.CURRENCY;
  })
  @IsNotEmpty()
  @IsEnum(CurrencyDisplay)
  currencyDisplay: CurrencyDisplay;

  @ValidateIf((data: AddFieldDto) => {
    return (
      data.fieldType === FormBuilderFieldTypes.NAME ||
      data.fieldType === FormBuilderFieldTypes.ADDRESS
    );
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => InputDto)
  @ValidateNested({ message: 'inputs must be an array' })
  inputs: InputDto[];

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.TERMS_AND_CONDITIONS;
  })
  @IsNotEmpty()
  @IsString()
  termsAndConditions: string;

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.SIGNATURE;
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  signatureDocument: Array<any>;

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.SIGNATURE;
  })
  @IsNotEmpty()
  @IsString()
  signaturePosition: string;

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.SIGNATURE;
  })
  @IsNotEmpty()
  @IsBoolean()
  preview: false;

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.SIGNATURE;
  })
  @IsNotEmpty()
  @IsString()
  selectPage: string;

  @ValidateIf((data: AddFieldDto) => {
    return (
      data.fieldType === FormBuilderFieldTypes.SIGNATURE &&
      data.selectPage === 'SPECIFY'
    );
  })
  @IsNotEmpty()
  @IsString()
  pageNumbers: string;

  @ValidateIf((data: AddFieldDto) => {
    return data.fieldType === FormBuilderFieldTypes.SIGNATURE;
  })
  @IsNotEmpty()
  @IsBoolean()
  coSign: boolean;

  @ValidateIf((data: AddFieldDto) => {
    return (
      data.fieldType === FormBuilderFieldTypes.SIGNATURE && data.coSign === true
    );
  })
  @IsNotEmpty()
  @IsNumberString()
  noOfSignatures: string;

  @ValidateIf((data: AddFieldDto) => {
    return (
      data.fieldType === FormBuilderFieldTypes.SIGNATURE && data.coSign === true
    );
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  signatureDetails: Array<any>;
}

export class UpdateFieldDto {
  @IsOptional()
  @IsEnum(FormBuilderFieldTypes)
  fieldType: FormBuilderFieldTypes;
}
