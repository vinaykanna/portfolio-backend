import { IsNotEmpty, IsString } from 'class-validator';
import { FormType } from './types';

class CreateValidationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  format: FormType;
}

export default CreateValidationDto;
