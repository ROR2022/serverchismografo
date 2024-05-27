import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private appRService: AppService) {}

  /* @Get()
  redirect(@Res() res: Response) {
    res.redirect('http://localhost:3000');
  } */

   @Get()
  getHello(): string {
    return this.appRService.getHello();
  } 
  /*
  @Get(':name')
  getHelloName(@Param() params: any): string {
    return `Hola ${params.name}!`;
  } */
}
