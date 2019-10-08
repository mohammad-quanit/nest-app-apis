import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entity/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../../DTO/user.dto';
import { ResponseDTO } from '../../DTO/ResponseObj.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /* Showing all Users */
  async showAll(): Promise<ResponseDTO[]> {
    const users = await this.userRepository.find({
      relations: ['ideas', 'bookmarks'],
    });
    return users.map(user => user.toResponseObject(false));
  }

  /* Login user */
  async login(data: any): Promise<ResponseDTO> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      throw new HttpException(
        'Invalid Username/Password',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }

  /* Register user */
  async register(data: UserDTO): Promise<ResponseDTO> {
    const { email } = data;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(data);
    await this.userRepository.save(user);
    return user.toResponseObject();
  }
}
