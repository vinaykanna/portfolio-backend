import { IsNotEmpty, IsOptional, ValidateIf } from 'class-validator';

export class RenameFileDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;
}
