import { Module } from '@nestjs/common';
import { ChismesController } from './chismes.controller';
import { ChismesService } from './chismes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChismeSchema, Goosip } from './schemas/chisme.schema';
import {
  ChismeLikeSchema,
  ChismeLike,
} from 'src/likes/schema/chismeLike.schema';
//import { Like } from 'src/likes/schema/chismeLike.schema';
import { Comment, CommentSchema } from 'src/comments/schema/comment.schema';
import { LikesModule } from 'src/likes/likes.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Goosip.name, schema: ChismeSchema }]),
    MongooseModule.forFeature([
      { name: ChismeLike.name, schema: ChismeLikeSchema },
    ]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    LikesModule,
  ],
  controllers: [ChismesController],
  providers: [ChismesService],
})
export class ChismesModule {}
