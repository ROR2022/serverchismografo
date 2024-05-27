import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Chismoso } from './schema/chismosos.schema';

@Injectable()
export class ChismososService {
  
  constructor(
    // eslint-disable-next-line prettier/prettier
    @InjectModel(Chismoso.name) private chismosoModel: Model<Chismoso>
  ) {
  }


  async create(chismoso: any): Promise<Chismoso> {
    const createdChismoso = new this.chismosoModel(chismoso);
    return createdChismoso.save();
  }

    async findAll(): Promise<Chismoso[]> {
        return this.chismosoModel.find().exec();
    }

    async findOne(id: string): Promise<Chismoso> {
        return this.chismosoModel.findById(id).exec();
    }

    async findOneByEmail(email: string): Promise<Chismoso> {
        return this.chismosoModel.findOne({ email }).exec();
    }

    async update(id: string, chismoso: any): Promise<Chismoso> {
        return this.chismosoModel.findByIdAndUpdate(id, chismoso, { new: true });
    }

    //buscar y actualizar por email
    async updateByEmail(email: string, chismoso: any): Promise<Chismoso> {
        return this.chismosoModel.findOneAndUpdate({ email },chismoso, { new: true });
    }

}
