import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ResponseDTO } from 'src/DTO/ResponseObj.dto';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createdAt: Date;

  @Column({ type: 'text' }) username: string;

  @Column({ type: 'text', unique: true }) email: string;

  @Column('text') password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken: boolean = true): ResponseDTO {
    const { id, createdAt, username, email, token } = this;
    const responseObj: any = { id, createdAt, username, email };
    if (showToken) {
      responseObj.token = token;
    }
    return responseObj;
  }

  async comparePassword(attemptPassword: string) {
    return await bcrypt.compare(attemptPassword, this.password);
  }

  private get token() {
    const { id } = this;
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '24h',
    });
  }
}
