import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game-dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}
  @Get('/one/:id')
  getOneGame(@Param('id') id: number) {
    return this.gameService.getOneById(id);
  }

  @Get('/list')
  getAllGames() {
    return this.gameService.getAllGames();
  }

  @Post()
  createGame(@Body() input: CreateGameDto) {
    return this.gameService.createGame(input);
  }

  @Delete(':id')
  deleteGame(@Param('id') id: number) {
    return this.gameService.deleteGame(id);
  }

  @Patch(':id')
  updateGame(@Param('id') id: number, @Body() input: UpdateGameDto) {
    return this.gameService.updateGame(id, input);
  }
}
