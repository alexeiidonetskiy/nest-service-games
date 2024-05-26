import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { GameEntity } from './entities/game.entity';
import { EntityManager } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game-dto';

@Injectable()
export class GameService {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
  ) {}

  async getOneById(id: number): Promise<GameEntity> {
    const game = await this.em.findOneBy(GameEntity, { id });
    if (!game) {
      throw new NotFoundException(`Game with id: ${id} not found`);
    }

    return game;
  }

  async createGame(input: CreateGameDto): Promise<GameEntity> {
    const { title, description } = input;
    if (await this.em.findOneBy(GameEntity, { title })) {
      throw new ConflictException(
        `The person with name: ${title} - already exists`,
      );
    }

    const game = this.em.create(GameEntity, { title, description });
    return await this.em.save(game);
  }

  async getAllGames(): Promise<GameEntity[]> {
    return await this.em.find(GameEntity);
  }

  async deleteGame(id: number): Promise<GameEntity> {
    const game = await this.getOneById(id);
    return await this.em.remove(game);
  }

  async updateGame(id: number, input: UpdateGameDto): Promise<GameEntity> {
    const game = await this.getOneById(id);
    const updated = this.em.merge(GameEntity, game, input as GameEntity);
    const saved = await this.em.save(updated);

    return saved;
  }
}
