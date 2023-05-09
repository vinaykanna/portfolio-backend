import { IsOptional, IsString } from 'class-validator';
import { Field } from '../schemas/field.schema';

export class UpdatePageDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  fields: Field[];
}
