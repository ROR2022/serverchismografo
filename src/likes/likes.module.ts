import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChismeLikeSchema, ChismeLike } from './schema/chismeLike.schema';
import { AppService } from 'src/app.service';
import { ChismesService } from 'src/chismes/chismes.service';
import { ChismeSchema, Goosip } from 'src/chismes/schemas/chisme.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChismeLike.name, schema: ChismeLikeSchema },
    ]),
    MongooseModule.forFeature([{ name: Goosip.name, schema: ChismeSchema }]),
  ],
  controllers: [LikesController],
  providers: [LikesService, AppService, ChismesService],
})
export class LikesModule {}
