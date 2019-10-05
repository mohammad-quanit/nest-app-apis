import { Controller, Logger, Post, Get, Body, UsePipes, UseGuards } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UserDTO } from '../../DTO/user.dto';
import { ValidationPipe } from '../../Shared/validation.pipe';
import { AuthGuard } from '../../Shared/auth.guard';
import { User } from '../../Shared/user.decorator';

@Controller()
export class UserController {
  private logger = new Logger('User Controller');

  constructor(private userServcie: UserService) { }

  @Get('users')
  @UseGuards(new AuthGuard())
  showAllUsers(@User('username') user) {
    return this.userServcie.showAll();
  }

  @Post('login')
  // @UsePipes(new ValidationPipe())
  login(@Body() data: any) {
    this.logger.log(JSON.stringify(data));
    return this.userServcie.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    this.logger.log(JSON.stringify(data));
    return this.userServcie.register(data);
  }
}
