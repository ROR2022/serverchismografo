import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { LikesService } from './likes.service';
import { ChismeLikeDto } from './dto/chismeLike.dto';

@Controller('api/likes')
export class LikesController {
  dataEnv: any;

  constructor(
    // eslint-disable-next-line prettier/prettier
    private appService: AppService,
    private likesService: LikesService,
  ) {
    this.dataEnv = this.appService.getDataEnv();
  }

  @Post()
  async createLike(@Body() dataLike: ChismeLikeDto) {
    return this.likesService.create(dataLike);
  }

  @Delete(':id')
  async deleteLike(@Param() params: any) {
    const idLike = params.id;
    
    return this.likesService.deleteLike(idLike);
  }

  @Get(':id')
  async findLikesInChisme(@Param() params: any) {
    const idChisme = params.id;
    return this.likesService.findAllLikesInChisme(idChisme);
  }
}
