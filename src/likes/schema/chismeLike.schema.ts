import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, mongo } from 'mongoose';

export type ChismeLikeDocument = HydratedDocument<ChismeLike>;

@Schema({ timestamps: true })
export class ChismeLike {
  @Prop({ type: mongo.ObjectId, ref: 'Chismoso' })
  author: string;

  @Prop({ type: mongo.ObjectId, ref: 'Goosip' })
  chisme: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ChismeLikeSchema = SchemaFactory.createForClass(ChismeLike);

ChismeLikeSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
