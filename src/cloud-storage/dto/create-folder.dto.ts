import { IsNotEmpty, IsOptional } from 'class-validator';

class CreateFolderDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  folderId: number;
}

export default CreateFolderDto;
