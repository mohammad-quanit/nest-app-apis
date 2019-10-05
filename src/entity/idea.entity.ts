import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('idea')
export class IdeaEntity {
  /* Database Fields */
  @PrimaryGeneratedColumn('uuid') id: string;

  @CreateDateColumn() created: Date;

  @UpdateDateColumn() updatedAt: Date;

  @Column('text') idea: string;

  @Column('text') description: string;

   /*
    Many to one relationship field
    for connecting user to idea
    i.e author field in idea table/entity
  */
  @ManyToOne(type => UserEntity, author => author.ideas)
  author: UserEntity;
}
