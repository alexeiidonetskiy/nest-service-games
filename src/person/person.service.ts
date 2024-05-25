import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { PersonEntity } from './entities/person.entity';
import { EntityManager } from 'typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { GameEntity } from 'src/game/entities/game.entity';

@Injectable()
export class PersonService {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
  ) {}

  private readonly logger = new Logger(PersonService.name);

  async getOneById(id: number): Promise<PersonEntity> {
    const person = await this.em.findOneBy(PersonEntity, { id });
    if (!person) {
      throw new NotFoundException(`The person with id: ${id} not found`);
    }

    return person;
  }

  async createPerson(input: CreatePersonDto): Promise<PersonEntity['id']> {
    const created = await this.em.transaction(async (em) => {
      const { name, gameId } = input;
      if (await em.findOneBy(PersonEntity, { name })) {
        throw new ConflictException(
          `The person with name: ${name} - already exists`,
        );
      }

      const game = await em.findOneBy(GameEntity, { id: gameId });
      if (!game) {
        throw new NotFoundException(`Game with id: ${gameId} not found`);
      }

      const person = em.create(PersonEntity, { name, game });
      return await em.save(person);
    });

    return created.id;
  }

  async deletePerson(id: number) {
    await this.em.transaction(async (em) => {
      const person = await this.getOneById(id);
      return await em.remove(person);
    });
  }
}
