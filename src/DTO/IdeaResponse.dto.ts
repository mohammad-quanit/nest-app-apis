import { ResponseDTO } from './ResponseObj.dto';
import { IdeaEntity } from '../entity/idea.entity';

export class IdeaResponseObject {
  id?: string;
  created: Date;
  updatedAt: Date;
  idea: string;
  description: string;
  author: ResponseDTO;
  upvotes?: number;
  downvotes?: number;
}
