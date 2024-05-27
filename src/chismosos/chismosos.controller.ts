import { Body, Controller, Param, ParseFilePipeBuilder, Post, Put,Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ChismososService } from './chismosos.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import { uploadOneFileToBucket } from 'src/lib/awsLib';

@Controller('api/chismosos')
export class ChismososController {
    dataEnv: any;
    // eslint-disable-next-line prettier/prettier
    constructor(private appService: AppService
        // eslint-disable-next-line prettier/prettier
        , private chismososService: ChismososService
    ) {
        this.dataEnv = this.appService.getDataEnv();
        //console.log('Este es el dataEnv(ChismososController):...', this.dataEnv);
    }

    // Crearemos el servicio de registro de chismoso
    @UseInterceptors(FileInterceptor('file'))
    @Post('/registerChismoso')
    async registerChismoso(
        @Body() chismoso: any,
        @UploadedFile(
            new ParseFilePipeBuilder()
              .addFileTypeValidator({
                fileType: /\/(jpg|jpeg|png)$/,
              })
              .build(),
          )
          file: Express.Multer.File,
    ) {
        const salt = 10;
        chismoso.password = await bcrypt.hash(chismoso.password, salt);
        const newChismoso:any = await this.chismososService.create(chismoso);
        const idChismoso = String(newChismoso._id);
        await uploadOneFileToBucket(
         file,
         idChismoso,
         this.dataEnv,
       );
       chismoso.imageUrl=`https://${this.dataEnv.AWS_BUCKETNAME}.s3.us-east-2.amazonaws.com/${idChismoso}/${file.originalname}`;

       //actualizamos el chismoso con la url de la imagen
       const updatedChismoso:any =  await this.chismososService.update(idChismoso, chismoso);

        //le crearemos un token
        const token = jwt.sign({ _id: updatedChismoso._id }, this.dataEnv.JWT_SECRET);
        return { tokenChismoso:token, ...updatedChismoso._doc };
    }

    // Crearemos el servicio de login de chismoso
    @Post('/loginChismoso')
    async loginChismoso(
        @Body() chismoso: any
    ) {
        const chismosoFound:any = await this.chismososService.findOneByEmail(chismoso.email);
        if (!chismosoFound) return { message: 'Email not Found' };
        const validPassword = await bcrypt.compare(chismoso.password, chismosoFound.password);
        if (!validPassword) return { message: 'Password is wrong' };
        //le crearemos un token
        const token = jwt.sign({ _id: chismosoFound._id }, this.dataEnv.JWT_SECRET);
        return { tokenChismoso:token, ...chismosoFound._doc };
    }

    @Put('/updatePassword')
    async updatePassword(
        @Body() chismoso: any
    ) {
        const salt = 10;
        chismoso.password = await bcrypt.hash(chismoso.password, salt);
        const updatedChismoso:any = await this.chismososService.updateByEmail(chismoso.email, chismoso);
        const token = jwt.sign({ _id: updatedChismoso._id }, this.dataEnv.JWT_SECRET);
        return { tokenChismoso:token, ...updatedChismoso._doc };
    }

    @Get('/findOne/:id')
    async findOne(@Param() params: any): Promise<any> {
        const idChismoso = params.id;
        return await this.chismososService.findOne(idChismoso);
    }
}
