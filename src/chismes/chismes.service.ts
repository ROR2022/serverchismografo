import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Goosip } from './schemas/chisme.schema';
import { ChismeDto } from './dto/chismeDto.dto';
import { ConfigService } from '@nestjs/config';
import path from 'path';

@Injectable()
export class ChismesService {
  // eslint-disable-next-line prettier/prettier
  constructor(
    @InjectModel(Goosip.name) private goosipModel: Model<Goosip>,
    private configService: ConfigService,
  ) {}

  getDataEnv() {
    const uri_mongodb = this.configService.get<string>('URI_MONGODB');
    const app_port = this.configService.get<string>('PORT');
    const AWS_ACCESSKEYID = this.configService.get<string>('AWS_ACCESSKEYID');
    const AWS_BUCKETNAME = this.configService.get<string>('AWS_BUCKETNAME');
    const AWS_SECRETACCESSKEY = this.configService.get<string>(
      'AWS_SECRETACCESSKEY',
    );
    const AWS_REGION = this.configService.get<string>('AWS_REGION');
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');

    const dataEnv = {
      uri_mongodb,
      app_port,
      AWS_ACCESSKEYID,
      AWS_BUCKETNAME,
      AWS_SECRETACCESSKEY,
      AWS_REGION,
      JWT_SECRET,
    };

    //console.log('Este es el dataEnv(ChismeService):...',dataEnv);

    return {
      ...dataEnv,
    };
  }

  async create(chismeDto: ChismeDto): Promise<Goosip> {
    const createdChisme = new this.goosipModel(chismeDto);
    return createdChisme.save();
  }

  async findAll(): Promise<Goosip[]> {
    //retornamos todos los chismes desde el mas reciente al mas antiguo
    //hacer un auto populate de los autores
    const chismes = await this.goosipModel
      .find()
      .sort({ createdAt: -1 })
      .populate('author')
      .populate('likes')
      .populate({
        path:'comments',
        populate:{
          path:'author'
        }
      })
      .exec();
    //console.log('Estos son los chismes:...',chismes[0]);
    // imprimiremos los likes de los chismes
    /* chismes.forEach((chisme) => {
      if (chisme.likes.length > 0) {
        console.log('likes:..', chisme.likes);
      }else{
        console.log('sin likes...')
      }
    }); */
    return chismes;
    //return this.goosipModel.find().sort({createdAt: -1}).exec();
    //return this.goosipModel.find().exec();
  }

  async findOne(id: string): Promise<Goosip> {
    console.log('Buscando el id:...', id);
    const chisme = await this.goosipModel.findById(id).exec();
    //crearemos una impresion de los datos del chisme
    
    //console.log('Este es el chisme:...', chisme);
    return chisme;
  }

  async update(id: string, chismeDto: ChismeDto): Promise<Goosip> {
    return this.goosipModel.findByIdAndUpdate(id, chismeDto, { new: true });
  }

  async addLike(idLike: any, idChisme: any): Promise<any> {
    return this.goosipModel
      .findByIdAndUpdate(
        idChisme,
        { $addToSet: { likes: idLike } },
        { new: true },
      )
      .exec();
  }

  async removeLike(idLike: any, idChisme: any): Promise<any> {
    return this.goosipModel
      .findByIdAndUpdate(idChisme, { $pull: { likes: idLike } }, { new: true })
      .exec();
  }

  async addComment(idComment: any, idChisme: any): Promise<any> {
    return this.goosipModel.findByIdAndUpdate(
      idChisme,
      { $addToSet: { comments: idComment } },
      { new: true },
    );
  }

  async removeComment(idComment: any, idChisme: any): Promise<any> {
    return this.goosipModel.findByIdAndUpdate(
      idChisme,
      { $pull: { comments: idComment } },
      { new: true },
    );
  }
}
