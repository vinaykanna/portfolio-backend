import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { FieldSize, FormBuilderInputTypes } from '../types';
import { RangeDto } from './range.dto';

export class Option {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class InputDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsOptional()
  @IsEnum(FieldSize)
  inputSize: FieldSize;

  @IsNotEmpty()
  @IsEnum(FormBuilderInputTypes)
  inputType: FormBuilderInputTypes;

  @IsOptional()
  @IsString()
  placeHolder: string;

  @IsNotEmpty()
  @IsBoolean()
  required: boolean;

  @IsNotEmpty()
  @IsBoolean()
  hide: boolean;

  @IsOptional()
  @Type(() => RangeDto)
  @ValidateNested({ message: 'Range must be an object' })
  range: RangeDto;

  @ValidateIf((data: InputDto) => {
    return data.inputType === FormBuilderInputTypes.TITLE;
  })
  @IsNotEmpty()
  @Type(() => Option)
  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  options: Option[];
}
