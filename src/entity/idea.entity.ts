import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
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
   i.e Many ideas from one author/user

   leftToRight ---> current entity to target entity
 */
  @ManyToOne(type => UserEntity, author => author.ideas)
  author: UserEntity;

  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable()
  upvotes: UserEntity[];

  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable()
  downvotes: UserEntity[];
}
