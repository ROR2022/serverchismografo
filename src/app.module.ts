import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChismesModule } from './chismes/chismes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { ChismososModule } from './chismosos/chismosos.module';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
//import { NextController } from './next.controller';
import { ChatModule } from './chat/chat.module';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [
    ChismesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('URI_MONGODB'),
      }),
      inject: [ConfigService],
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    ChismososModule,
    LikesModule,
    CommentsModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseService],
})
export class AppModule {}
