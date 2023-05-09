import { IsNotEmpty, IsString } from 'class-validator';

export class AllowedCountriesDto {
  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
