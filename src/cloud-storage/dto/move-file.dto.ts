import { IsNotEmpty } from 'class-validator';

class MoveFileDto {
  @IsNotEmpty()
  originId: number;

  @IsNotEmpty()
  destinationId: number;
}

export default MoveFileDto;
