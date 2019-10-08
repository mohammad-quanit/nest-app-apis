import { IdeaEntity } from 'src/entity/idea.entity';

export class ResponseDTO {
  id: string;
  username: string;
  createdAt: Date;
  email: string;
  token?: string;
  bookmarks: IdeaEntity[];
}
