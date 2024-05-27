import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CommentsService } from './comments.service';

@Controller('api/comments')
export class CommentsController {
    dataEnv: any;

    constructor(
      // eslint-disable-next-line prettier/prettier
      private appService: AppService,
      private commentsService: CommentsService,
    ) {
      this.dataEnv = this.appService.getDataEnv();
    }

    //servicio que crea un nuevo comentario
    @Post()
    async createComment(@Body() dataComment:any){
        return this.commentsService.create(dataComment)
    }

    @Delete(':id')
    async deleteComment(@Param() params:any){
        const idComment= params.id;
        return this.commentsService.deleteComment(idComment)
    }
    
    @Put()
    async editComment(@Body() dataComment:any){
        return this.commentsService.editComment(dataComment)
    }

    @Get(':id')
    async findCommentsInChisme(@Param() params:any){
        const idChisme= params.id;
        return this.commentsService.findCommentsInChisme(idChisme)
    }


}
