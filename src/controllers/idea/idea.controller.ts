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

  private logger = new Logger('Idea Controller');

  constructor(private ideaService: IdeaService) {}
  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createIdea(@Body() data: IdeaDTO) {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.create(data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.showOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateIdea(@Param('id') id: string, @Body() data: IdeaDTO) {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.update(id, data);
  }

  @Delete()
  destroyIdea(@Query('id') id: string) {
    return this.ideaService.destroy(id);
  }
}
