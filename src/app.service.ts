import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getDataEnv() {
    const uri_mongodb = this.configService.get<string>('URI_MONGODB');
    const app_port = this.configService.get<string>('PORT');
    const AWS_ACCESSKEYID = this.configService.get<string>('AWS_ACCESSKEYID');
    const AWS_BUCKETNAME = this.configService.get<string>('AWS_BUCKETNAME');
    const AWS_SECRETACCESSKEY = this.configService.get<string>('AWS_SECRETACCESSKEY'); 
    const AWS_REGION = this.configService.get<string>('AWS_REGION');
    const JWT_SECRET = this.configService.get<string>('JWT_SECRET');

    return {
      uri_mongodb,
      app_port,
      AWS_ACCESSKEYID,
      AWS_BUCKETNAME,
      AWS_SECRETACCESSKEY,
      AWS_REGION,
      JWT_SECRET
    };
  }

  getHello(): string {
    return 'Hello World!';
  }
}
