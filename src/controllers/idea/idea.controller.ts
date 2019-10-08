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
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  updateIdea(@Param('id') id: string, @User('id') user: string, @Body() data: Partial<IdeaDTO>) {
    this.logData({ id, user, data });
    return this.ideaService.update(id, user, data);
  }

  /* Deleting single idea */
  @Delete()
  @UseGuards(new AuthGuard())
  destroyIdea(@Query('id') id: string, @User('id') user: string) {
    this.logData({ id, user });
    return this.ideaService.destroy(id, user);
  }
}
