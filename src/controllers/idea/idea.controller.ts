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
  UseGuards,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { IdeaService } from '../../services/idea/idea.service';
import { IdeaDTO } from '../../DTO/idea.dto';
import { ValidationPipe } from '../../Shared/validation.pipe';
import { AuthGuard } from '../../Shared/auth.guard';
import { User } from '../../Shared/user.decorator';

@Controller('ideas')
@UseInterceptors(CacheInterceptor)
export class IdeaController {

  /* A Global logger */
  private logger = new Logger('Idea Controller');

  constructor(private ideaService: IdeaService) { }

  private logData(options: any) {
    // tslint:disable-next-line: no-unused-expression
    options.user && this.logger.log('USER...', JSON.stringify(options.user));
    // tslint:disable-next-line: no-unused-expression
    options.data && this.logger.log('DATA...', JSON.stringify(options.data));
    // tslint:disable-next-line: no-unused-expression
    options.id && this.logger.log('ID...', JSON.stringify(options.id));
  }

  /* Getting all ideas */
  @Get()
  showAllIdeas() {
    // tslint:disable-next-line: no-console
    console.time('Time this');
    // tslint:disable-next-line: no-console
    console.timeEnd('Time this');
    return this.ideaService.showAll();
  }

  /* Posting new idea */
  @Post()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createIdea(@User('id') user, @Body() data: IdeaDTO) {
    this.logData({ user, data });
    return this.ideaService.create(user, data);
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
