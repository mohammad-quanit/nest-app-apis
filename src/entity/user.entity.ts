import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ResponseDTO } from 'src/DTO/ResponseObj.dto';
import { IdeaEntity } from './idea.entity';

@Entity('user')
export class UserEntity {
  /* Database Fields */
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() createdAt: Date;

  @Column({ type: 'text' }) username: string;

  @Column({ type: 'text', unique: true }) email: string;

  @Column('text') password: string;

  /*
    One to many relationship field
    for connecting user to idea
    i.e One author/user have many ideas

    leftToRight ---> current entity to target entity
  */
  @OneToMany(type => IdeaEntity, idea => idea.author)
  ideas: IdeaEntity[];

  @ManyToMany(type => IdeaEntity, { cascade: true })
  @JoinTable()
  bookmarks: IdeaEntity[];

  /* Hashing password before inserting into DB */
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  /* Object Response for all http methods */
  toResponseObject(showToken: boolean = true): ResponseDTO {
    const { id, createdAt, username, email, token } = this;
    const responseObj: any = { id, createdAt, username, email };
    if (showToken) { responseObj.token = token; }
    if (this.ideas) { responseObj.ideas = this.ideas; }
    if (this.bookmarks) { responseObj.bookmarks = this.bookmarks; }
    return responseObj;
  }

  /* Comparing password for login */
  async comparePassword(attemptPassword: string) {
    return await bcrypt.compare(attemptPassword, this.password);
  }

  /* Getter for signing auth token */
  private get token() {
    const { id } = this;
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '24h',
    });
  }
}
