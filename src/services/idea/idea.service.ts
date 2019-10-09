import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdeaDTO } from '../../DTO/idea.dto';
import { IdeaEntity } from '../../entity/idea.entity';
import { UserEntity } from '../../entity/user.entity';
import { IdeaResponseObject } from '../../DTO/IdeaResponse.dto';
import { Votes } from '../../Shared/votes.enum';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  /* A custom response method for idea services */
  private toResponseObject(idea: IdeaEntity): IdeaResponseObject {
    const resObj: any = {
      ...idea,
      author: idea.author.toResponseObject(false),
    };
    if (resObj.upvotes) {
      resObj.upvotes = idea.upvotes.length;
    }
    if (resObj.downvotes) {
      resObj.downvotes = idea.downvotes.length;
    }
    return resObj;
  }

  /* Upvote Downvote Logic */
  private async vote(idea: IdeaEntity, user: UserEntity, vote: Votes) {
    const opposite = vote === Votes.UP ? Votes.DOWN : Votes.UP;
    if (
      idea[opposite].filter(voter => voter.id === user.id).length > 0 ||
      idea[vote].filter(voter => voter.id === user.id).length > 0
    ) {
      idea[opposite] = idea[opposite].filter(voter => voter.id !== user.id);
      idea[vote] = idea[vote].filter(voter => voter.id !== user.id);
      await this.ideaRepository.save(idea);
    }
    return idea;
  }

  /* if users are authenticated, for deletion and updation */
  private checkOwnershipForDeleteUpdate(idea: IdeaEntity, userId: string) {
    if (idea.author.id !== userId) {
      throw new HttpException('Incorrect User!', HttpStatus.UNAUTHORIZED);
    }
  }

  /* Showing all ideas */
  async showAll() {
    const ideas = await this.ideaRepository.find({
      relations: ['author', 'upvotes', 'downvotes'],
    });
    return ideas.map(idea => this.toResponseObject(idea));
  }

  /* Creating/Saving an idea */
  async create(id: string, data: IdeaDTO): Promise<IdeaResponseObject> {
    const user = await this.userRepository.findOne({ where: { id } });
    const idea = await this.ideaRepository.create({ ...data, author: user });
    await this.ideaRepository.save(idea);
    return this.toResponseObject(idea);
  }

  /* showing single idea */
  async showOne(id: string): Promise<IdeaResponseObject> {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return this.toResponseObject(idea);
  }

  /* Updating an idea */
  async update(
    id: string,
    userId: string,
    data: Partial<IdeaDTO>,
  ): Promise<IdeaResponseObject> {
    let idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    this.checkOwnershipForDeleteUpdate(idea, userId);
    await this.ideaRepository.update({ id }, data);
    idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return this.toResponseObject(idea);
  }

  /* Deleting an idea */
  async destroy(id: string, userId: string): Promise<IdeaResponseObject> {
    const idea = await this.ideaRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!idea) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    this.checkOwnershipForDeleteUpdate(idea, userId);
    await this.ideaRepository.delete({ id });
    return this.toResponseObject(idea);
  }

  /* Bookmark service */
  async bookmark(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['bookmarks'],
    });

    if (user.bookmarks.filter(bookmark => bookmark.id === idea.id).length < 1) {
      user.bookmarks.push(idea);
      await this.userRepository.save(user);
    } else {
      throw new HttpException(
        'Idea Already bookmarked',
        HttpStatus.BAD_REQUEST,
      );
    }

    return user.toResponseObject();
  }

  /* UnBookmark service */
  async unBookmark(id: string, userId: string) {
    const idea = await this.ideaRepository.findOne({ where: { id } });
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['bookmarks'],
    });

    if (user.bookmarks.filter(bookmark => bookmark.id === idea.id).length > 0) {
      user.bookmarks = user.bookmarks.filter(
        bookmark => bookmark.id !== idea.id,
      );
      await this.userRepository.save(user);
    } else {
      throw new HttpException(
        'Idea Already bookmarked',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user.toResponseObject();
  }
}
