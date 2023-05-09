import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { FormType, SortBy, SortOrder } from './types';

export class FindFormsDto {
  @ValidateIf((o) => o.type === FormType.KYB)
  @IsNotEmpty()
  @IsNumberString()
  clientId: string;

  @ValidateIf((o) => o.type === FormType.TASK)
  @IsNotEmpty()
  @IsNumberString()
  taskId: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsNotEmpty()
  @IsEnum(FormType)
  type: FormType;

  @IsOptional()
  @IsEnum(SortBy, { message: '$value is not a valid sortBy value' })
  sortBy: SortBy;

  @ValidateIf((o) => o.sortBy)
  @IsEnum(SortOrder, {
    message: '$value is not a valid sortOrder value',
  })
  sortOrder: SortOrder;
}
