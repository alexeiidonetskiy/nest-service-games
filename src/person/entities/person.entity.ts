import { GameEntity } from 'src/game/entities/game.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity({ name: 'person' })
@Unique(['name'])
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => GameEntity, {
    nullable: false,
  })
  @JoinColumn({ name: 'gameId' })
  game: GameEntity;
}
