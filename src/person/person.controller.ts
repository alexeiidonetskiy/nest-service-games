import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get(':id')
  getPerson(@Param('id') id: number) {
    return this.personService.getOneById(id);
  }

  @Post()
  createPerson(@Body() input: CreatePersonDto) {
    return this.personService.createPerson(input);
  }

  @Delete(':id')
  deletePerson(@Param('id') id: number) {
    return this.personService.deletePerson(id);
  }
}
