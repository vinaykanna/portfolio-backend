import { BadRequestException, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsService {
  getHello(): string {
    return 'Hello World!';
  }

  async upload(file: Express.Multer.File) {
    try {
      const { originalname } = file;
      const upload = await this.uploadS3(
        file.buffer,
        originalname,
        file.mimetype,
      );
      return upload;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async uploadS3(
    file: Buffer,
    name: string,
    contentType = '',
  ): Promise<S3.ManagedUpload.SendData> {
    const s3 = this.getS3();
    const bucket = process.env.AWS_BUCKET_NAME;
    const params = {
      Bucket: bucket,
      Key: name,
      Body: file,
      ContentType: contentType,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err: Error, data: S3.ManagedUpload.SendData) => {
        if (err) {
          console.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  async getFileFromS3(key: string) {
    const s3 = this.getS3();
    const bucket = process.env.AWS_BUCKET_NAME;
    const params = { Bucket: bucket, Key: key };

    return new Promise((resolve, reject) => {
      s3.getObject(params, (err, data) => {
        if (err) {
          console.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
}
