import { ResponseDTO } from './ResponseObj.dto';

export class IdeaResponseObject {
  id?: string;
  created: Date;
  updatedAt: Date;
  idea: string;
  description: string;
  author: ResponseDTO;
}
