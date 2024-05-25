import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'game'})
export class GameEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;
}
