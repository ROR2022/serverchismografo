import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schema/comment.schema';
import { ChismesService } from 'src/chismes/chismes.service';

@Injectable()
export class CommentsService {

    constructor(
        // eslint-disable-next-line prettier/prettier
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
        private chismeService: ChismesService
    ){}

    //Agregaremos los metodos para crear, borrar, eliminar un comentario y otro para encontrar todos los comentarios en un chisme

    //Metodo para crear un Comentario
    async create(dataComment:any): Promise<any>{
        const newComment = new this.commentModel(dataComment)
        const tempComent = newComment.save()
        const idComment = (await tempComent)._id
        const idChisme = dataComment.chisme;
        const responseAddComment = this.chismeService.addComment(idComment,idChisme)
        return responseAddComment
    }

    //Metodo para borrar un comentario
    async deleteComment(id:any): Promise<any>{
        return this.commentModel.findByIdAndDelete(id);
    }

    //Metodo para editar un comentario
    async editComment(dataComment:any): Promise<Comment>{
        return this.commentModel.findByIdAndUpdate({_id:dataComment._id},dataComment,{new:true})
    }

    //Metodo para encontrar todos los comentarios en un chisme
    async findCommentsInChisme(idChisme:any): Promise<any>{
        return this.commentModel.find({chisme:idChisme})
    }
}
