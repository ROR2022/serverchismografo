import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schema/comment.schema';
import { AppService } from 'src/app.service';
import { ChismesService } from 'src/chismes/chismes.service';
import { ChismeSchema, Goosip } from 'src/chismes/schemas/chisme.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Goosip.name, schema: ChismeSchema }]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, AppService, ChismesService],
})
export class CommentsModule {}
