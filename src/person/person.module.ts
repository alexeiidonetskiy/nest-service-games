import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonEntity } from './entities/person.entity';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { GameEntity } from 'src/game/entities/game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity, GameEntity])],
  providers: [PersonService],
  controllers: [PersonController],
})
export class PersonModule {}
