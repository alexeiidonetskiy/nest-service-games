import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { GameEntity } from './entities/game.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity])],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
