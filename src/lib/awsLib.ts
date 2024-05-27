import {
  S3Client,
  PutObjectCommand,
  PutBucketCorsCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
//import fs from 'fs';
//import { __dirname } from "../app.js";
//import { mainDir } from "../../";
//import { AppService } from 'src/app.service';

//import { Put } from '@nestjs/common';

type MyType = {
  msg: string;
  resultUpload?: any;
  error?: any;
};
/* const configService = new ConfigService();
const AWS_ACCESSKEYID = configService.get<string>('AWS_ACCESSKEYID');
const AWS_BUCKETNAME = configService.get<string>('AWS_BUCKETNAME');
const AWS_SECRETACCESSKEY = configService.get<string>('AWS_SECRETACCESSKEY');
const AWS_REGION = configService.get<string>('AWS_REGION'); */

//const myAppService = new AppService(new ConfigService());

/* const { AWS_ACCESSKEYID, AWS_BUCKETNAME, AWS_SECRETACCESSKEY, AWS_REGION } =
  process.env; */

//const mainDir = process.cwd();

export const generateUniqueId = () => {
  const length = 24;
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!$%&*()_+?';
  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }
  return result;
};

/* export const setCorsBucket = async () => {
  const client = new S3Client({
    credentials: {
      accessKeyId: AWS_ACCESSKEYID,
      secretAccessKey: AWS_SECRETACCESSKEY,
    },
    region: AWS_REGION,
  });
  //console.log('AWS_ACCESSKEYID:',AWS_ACCESSKEYID);
  //console.log('AWS_SECRETACCESSKEY:',AWS_SECRETACCESSKEY);
  //console.log('AWS_BUCKETNAME:',AWS_BUCKETNAME);
  try {
    const input = {
      // PutBucketCorsRequest
      Bucket: AWS_BUCKETNAME, // required
      CORSConfiguration: {
        // CORSConfiguration
        CORSRules: [
          // CORSRules // required
          {
            // CORSRule
            AllowedHeaders: [
              // AllowedHeaders
              '*',
            ],
            AllowedMethods: [
              // AllowedMethods // required
              'POST',
              'GET',
            ],
            AllowedOrigins: [
              // AllowedOrigins // required
              '*',
            ],
            ExposeHeaders: [],
          },
        ],
      },
    };
    const command = new PutBucketCorsCommand(input);
    const response = await client.send(command);

    console.log('response setCorsBucket:..', response);
  } catch (error) {
    console.log('Error setBucketCors:..', error);
  }
}; */

export const uploadOneFileToBucket = async (
  dataFile: any,
  target_id: any,
  dataEnv: any,
) => {
  /*  const { AWS_ACCESSKEYID, AWS_BUCKETNAME, AWS_SECRETACCESSKEY, AWS_REGION } =
    dataEnv; */
  //console.log('dataEnv:..', dataEnv);
  const client = new S3Client({
    credentials: {
      accessKeyId: dataEnv.AWS_ACCESSKEYID || '',
      secretAccessKey: dataEnv.AWS_SECRETACCESSKEY || '',
    },
    region: dataEnv.AWS_REGION || '',
  });
  /* console.log('AWS_ACCESSKEYID:..', AWS_ACCESSKEYID);
  console.log('AWS_SECRETACCESSKEY:..', AWS_SECRETACCESSKEY);
  console.log('AWS_BUCKETNAME:..', AWS_BUCKETNAME);
  console.log('AWS_REGION:..', AWS_REGION); */
  let response: MyType = {
    msg: 'Proceso upLoadOneFileToBubket:..',
  };
  //eliminar del tempFilePath el ./server
  //const tempFilePath = dataFile.tempFilePath.replace('server/','');
  try {
    //console.log('alparecer todo ok al leer el archivo:..', dataFile);
    //console.log('AWS_BUCKETNAME:..', dataEnv.AWS_BUCKETNAME);
    const input: PutObjectCommandInput = {
      ACL: 'public-read',
      Body: dataFile.buffer,
      Bucket: dataEnv.AWS_BUCKETNAME || '',
      Key: `${target_id}/${dataFile.originalname}`,
    };
    const command = new PutObjectCommand(input);
    const resultUpload = await client.send(command);
    //const resultUploadFile = `resultUpload${item.name}`;

    response = {
      ...response,
      resultUpload,
    };
  } catch (error) {
    return {
      ...response,
      error,
    };
  }
};
