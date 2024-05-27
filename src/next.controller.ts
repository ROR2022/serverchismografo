import { Controller, Get, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

@Controller()
export class NextController {
    @Get('*')
    // eslint-disable-next-line prettier/prettier
    async getNext(@Req() req: Request, @Res() res: Response) {
        await app.prepare();
        handle(req, res);
    }
  }

