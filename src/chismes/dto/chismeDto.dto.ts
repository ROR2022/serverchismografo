//import { Comment } from 'src/comments/schema/comment.schema';
//import { Like } from 'src/likes/schema/chismeLike.schema';

export class ChismeDto {
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  likes: Array<any>;
  comments: Array<any>;
}
