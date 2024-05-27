import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, mongo } from 'mongoose';
import { Comment } from 'src/comments/schema/comment.schema';
//import { ChismeLikeDto } from 'src/likes/dto/chismeLike.dto';
import { ChismeLike } from 'src/likes/schema/chismeLike.schema';
//import { Comment } from 'src/comments/schema/comment.schema';
//import { Like } from 'src/likes/schema/chismeLike.schema';

export type ChismeDocument = HydratedDocument<Goosip>;

@Schema({ timestamps: true })
export class Goosip {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: mongo.ObjectId, ref: 'Chismoso' })
  author: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'ChismeLike' }],
    ref: 'ChismeLike',
  })
  likes: ChismeLike[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Comment' }],
    ref: 'Comment',
  })
  comments: Comment[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ChismeSchema = SchemaFactory.createForClass(Goosip);

ChismeSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
