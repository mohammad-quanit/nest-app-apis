import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { IdeaService } from '../../services/idea/idea.service';
import { IdeaDTO } from 'src/DTO/idea.dto';

@Controller('idea')
export class IdeaController {
  constructor(private ideaService: IdeaService) {}
  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Post()
  createIdea(@Body() data: IdeaDTO) {
    return this.ideaService.create(data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.showOne(id);
  }

  @Put(':id')
  updateIdea(@Param('id') id: string, @Body() data: IdeaDTO) {
    return this.ideaService.update(id, data);
  }

  @Delete()
  destroyIdea(@Query('id') id: string) {
    return this.ideaService.destroy(id);
  }
}
