import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';
import { FileSizeType } from '../types';

export class FileMaxSizeDto {
  @IsNotEmpty()
  @IsEnum(FileSizeType)
  type: FileSizeType;

  @IsNotEmpty()
  @IsNumber()
  size: number;
}
