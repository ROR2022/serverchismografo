import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, mongo } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: mongo.ObjectId, ref: 'Chismoso' })
  author: string;

  @Prop({ type: mongo.ObjectId, ref: 'Goosip' })
  chisme: string;

  @Prop()
  comment: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
