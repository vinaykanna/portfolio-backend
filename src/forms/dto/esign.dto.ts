import { IsNotEmpty, IsString } from 'class-validator';

export class EsignDto {
  @IsNotEmpty()
  @IsString()
  successUrl: string;

  @IsNotEmpty()
  @IsString()
  failureUrl: string;

  @IsNotEmpty()
  @IsString()
  cancelUrl: string;
}
