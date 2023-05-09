import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  ValidateIf,
} from 'class-validator';
import { FormType } from './types';

class CloneFormDto {
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
}

export default CloneFormDto;
