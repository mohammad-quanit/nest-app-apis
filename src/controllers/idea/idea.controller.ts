import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UsePipes,
  Logger,
} from '@nestjs/common';
import { IdeaService } from '../../services/idea/idea.service';
import { IdeaDTO } from '../../DTO/idea.dto';
import { ValidationPipe } from '../../Shared/validation.pipe';

@Controller('idea')
export class IdeaController {

  /* A Global logger */
  private logger = new Logger('Idea Controller');

  constructor(private ideaService: IdeaService) {}

  /* Getting all ideas */
  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  /* Posting new idea */
  @Post()
  @UsePipes(new ValidationPipe())
  createIdea(@Body() data: IdeaDTO) {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.create(data);
  }

  /* showing single idea */
  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.showOne(id);
  }

  /* Updating single idea */
  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateIdea(@Param('id') id: string, @Body() data: IdeaDTO) {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.update(id, data);
  }

  /* Deleting single idea */
  @Delete()
  destroyIdea(@Query('id') id: string) {
    return this.ideaService.destroy(id);
  }
}
