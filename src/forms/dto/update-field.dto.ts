import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { FieldSize, FormBuilderFieldTypes, Range } from './types';

export class UpdateFieldDto {
  @IsOptional()
  @IsString()
  label: string;

  @IsOptional()
  @IsEnum(FieldSize)
  fieldSize: FieldSize;

  @IsOptional()
  @IsEnum(FormBuilderFieldTypes)
  fieldType: FormBuilderFieldTypes;

  @IsOptional()
  @IsString()
  placeHolder: string;

  @IsOptional()
  @IsBoolean()
  required: boolean;

  @IsOptional()
  range: Range;
}
