import { Module } from '@nestjs/common';
import { ChismososController } from './chismosos.controller';
import { ChismososService } from './chismosos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Chismoso, ChismosoSchema } from './schema/chismosos.schema';
import { AppService } from 'src/app.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chismoso.name, schema: ChismosoSchema },
    ]),
  ],
  controllers: [ChismososController],
  providers: [ChismososService, AppService],
})
export class ChismososModule {}
