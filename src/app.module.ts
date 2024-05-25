import { Module } from '@nestjs/common';
import { GameModule } from './game/game.module';
import { PersonService } from './person/person.service';
import { PersonController } from './person/person.controller';
import { PersonModule } from './person/person.module';
import { DeveloperModule } from './developer/developer.module';
import { LocalizationModule } from './localization/localization.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameEntity } from './game/entities/game.entity';
import { PersonEntity } from './person/entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [GameEntity, PersonEntity],
      synchronize: true,
    }),
    GameModule,
    PersonModule,
    DeveloperModule,
    LocalizationModule,
  ],
})
export class AppModule {}
