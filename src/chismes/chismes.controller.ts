import {
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
//import { diskStorage } from 'multer';
//import { extname } from 'path';
import { ChismesService } from './chismes.service';
import { ChismeDto } from './dto/chismeDto.dto';
import { uploadOneFileToBucket, generateUniqueId } from 'src/lib/awsLib';
//import { AppService } from 'src/app.service';
import * as jwt from 'jsonwebtoken';

@Controller('api/chismes')
export class ChismesController {
  dataEnv: any;

  // eslint-disable-next-line prettier/prettier
  constructor(private chismeService: ChismesService) {
    this.dataEnv = this.chismeService.getDataEnv();
    //console.log('Este es el dataEnv:...', this.dataEnv);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body() chismeDto: ChismeDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /\/(jpg|jpeg|png)$/,
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    //const idFile = generateUniqueId();
    //console.log('Este es el archivo:...', file);
    //console.log('Este es el idFile:...', idFile);
    //console.log('Este es el dataEnv:...', this.chismeService.getDataEnv());
    //extraemos el id del author del chisme
    console.log('Este es el token:...', chismeDto.author);
    console.log('este es el JWT_Secret:..', this.dataEnv.JWT_SECRET);
    const {_id}:any = jwt.verify(chismeDto.author, this.dataEnv.JWT_SECRET);
    chismeDto.author=String(_id);
    const newChisme:any = await this.chismeService.create(chismeDto);
    const idChisme = String(newChisme._id);
     await uploadOneFileToBucket(
      file,
      idChisme,
      this.chismeService.getDataEnv(),
    );
    chismeDto.imageUrl=`https://${this.dataEnv.AWS_BUCKETNAME}.s3.us-east-2.amazonaws.com/${idChisme}/${file.originalname}`;
    //console.log('Este es el resultUpload:...', resultUpload);
    

    return await this.chismeService.update(idChisme, chismeDto);
  }

  @Get()
  async findAll() {
    return await this.chismeService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: any): Promise<any> {
    const idChisme = params.id;
    return await this.chismeService.findOne(idChisme);
  }

  @Put(':id')
  async update(
    @Body() chismeDto: ChismeDto,
    @Param() params: any,
  ): Promise<any> {
    const id = params.id;
    return await this.chismeService.update(id, chismeDto);
  }
}

/**
 * 
 * 
 * ,{
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              return cb(null, `${randomName}${extname(file.originalname)}`);
            },
          }),
    }
 * 
 */
