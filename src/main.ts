import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
//import * as express from 'express';
//import { join } from 'path';
//import { setCorsBucket } from './lib/awsLib';
//import cors from 'cors';

async function bootstrap() {
  const configService = new ConfigService();
  const app_port = configService.get<string>('PORT');
  const app = await NestFactory.create(AppModule);
  // Servir archivos estáticos de Next.js
  //app.use(express.static('../chismografo/out'));
  //app.use('/static', express.static('../../chismografo/'));
  app.enableCors();

  await app.listen(app_port);
  //await setCorsBucket();
}
bootstrap();
