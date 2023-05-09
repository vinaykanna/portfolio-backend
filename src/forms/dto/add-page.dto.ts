import { IsNotEmpty, IsString } from 'class-validator';

export class AddPageDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
