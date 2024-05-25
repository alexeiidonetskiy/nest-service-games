import { IsNotEmpty } from 'class-validator';
import { GameEntity } from 'src/game/entities/game.entity';

export class CreatePersonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  gameId: number;
}
