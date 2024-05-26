import { IsNotEmpty } from 'class-validator';
export class CreatePersonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  gameId: number;
}
