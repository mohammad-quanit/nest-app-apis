import { Controller, Logger, Post, Get, Body, UsePipes } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { UserDTO } from '../../DTO/user.dto';
import { ValidationPipe } from '../../Shared/validation.pipe';

@Controller('users')
export class UserController {
  private logger = new Logger('User Controller');

  constructor(private userServcie: UserService) {}

  @Get()
  showAllUsers() {
    return this.userServcie.showAll();
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
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
