import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { RangeType } from '../types';

export class RangeDto {
  @IsNotEmpty()
  @IsNumber()
  min: number;

  @IsNotEmpty()
  @IsNumber()
  max: number;

  @IsNotEmpty()
  @IsEnum(RangeType)
  type: RangeType;
}
