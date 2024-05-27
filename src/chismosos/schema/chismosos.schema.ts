import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChismososDocument = HydratedDocument<Chismoso>;

@Schema({ timestamps: true })
export class Chismoso {
  @Prop()
  name: string;

  @Prop()
  lastName: string;

  @Prop()
  imageUrl: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ChismosoSchema = SchemaFactory.createForClass(Chismoso);

ChismosoSchema.pre('save', function (next) {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  const localDate = new Date(now.getTime() - timezoneOffset);
  this.createdAt = localDate;
  this.updatedAt = localDate;
  next();
});
