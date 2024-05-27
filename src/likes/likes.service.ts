import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ChismeLike } from './schema/chismeLike.schema';
import { Model } from 'mongoose';
import { ChismeLikeDto } from './dto/chismeLike.dto';
import { ChismesService } from 'src/chismes/chismes.service';

@Injectable()
export class LikesService {

    constructor(
        // eslint-disable-next-line prettier/prettier
        @InjectModel(ChismeLike.name) private likeModel: Model<ChismeLike>,
        private chismeService: ChismesService
        
    ){
    }


    //Metodo que crea un nuevo like
    async create(dataLike:ChismeLikeDto): Promise<ChismeLike>{
        const createLike = new this.likeModel(dataLike)
        const newLike= createLike.save()
        const idLike= (await newLike)._id
        const responseAddLike = this.chismeService.addLike(idLike,dataLike.chisme)
        return responseAddLike
    }

    //Metodo que borra un like
    async deleteLike(id:any): Promise<any>{
        const getDataLike = await this.getOneLikeById(id);
        const idChisme = getDataLike.chisme;
        const responseRemoveLike = this.chismeService.removeLike(id, idChisme)
        console.log(responseRemoveLike);
        return this.likeModel.findByIdAndDelete(id).exec()
    }

    //Metodo que retorna todos los likes de un chisme
    async findAllLikesInChisme(id:any): Promise<any>{
        return this.likeModel.find({chisme:id})
    }

    async getOneLikeById(id:any): Promise<any>{
        return this.likeModel.findById(id);
    }




}
