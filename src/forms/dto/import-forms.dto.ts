import { IsArray, IsNotEmpty } from 'class-validator';

class ImportFormsDto {
  @IsNotEmpty()
  @IsArray()
  forms: Array<string>;
}

export default ImportFormsDto;
