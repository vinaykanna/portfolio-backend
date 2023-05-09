import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { FormType } from './types';

class CreateFormDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @ValidateIf((o) => o.type === FormType.KYB)
  @IsNotEmpty()
  @IsNumberString()
  clientId: string;

  @ValidateIf((o) => o.type === FormType.TASK)
  @IsNotEmpty()
  @IsNumberString()
  taskId: string;

  @IsNotEmpty()
  @IsEnum(FormType)
  type: FormType;

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsOptional()
  @IsString()
  description: string;
}

export class UpdateFormDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  tags: string[];

  @IsOptional()
  @IsString()
  description: string;
}

export default CreateFormDto;
