import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { StorageType } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { AwsService } from './aws.service';
import CreateFolderDto from './dto/create-folder.dto';
import { S3 } from 'aws-sdk';
import { RenameFileDto } from './dto/rename-file.dto';
import MoveFileDto from './dto/move-file.dto';

export interface IUploadBody {
  folderId: number | null;
}

interface IUpload {
  file: Express.Multer.File;
  body: IUploadBody;
}

type UploadRes = S3.ManagedUpload.SendData;

@Injectable()
export class CloudStorageService {
  constructor(private prisma: PrismaService, private awsService: AwsService) {}

  async getStorage(query: any) {
    try {
      const storage = await this.prisma.storage.findMany({
        where: {
          parentId: +query?.folderId || null,
          AND: [
            {
              name: query?.search ? { contains: query?.search } : undefined,
            },
          ],
        },
        include: {
          children: true,
        },
      });

      const breadCrumbs = await this.prisma.$queryRaw`
        WITH RECURSIVE cte_storage(id, parentId, name) as (
         SELECT id, parentId, name from storage WHERE id = ${
           +query?.folderId || null
         }
          UNION ALL
         SELECT s.id, s.parentId, s.name
         from cte_storage as cs JOIN storage AS s on cs.parentId = s.id
      )

      SELECT name, id from cte_storage order by id;
    `;

      let result = storage.map((item) => {
        return {
          ...item,
          fileUrl: process.env.AWS_BASE_URL + '/' + item.file,
        };
      });

      return {
        result,
        breadCrumbs,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(err);
    }
  }

  async createFolder(body: CreateFolderDto) {
    const folder = await this.prisma.storage.create({
      data: {
        name: body.name,
        type: StorageType.FOLDER,
        parentId: +body.folderId || null,
      },
    });

    return folder;
  }

  async uploadFile(args: IUpload) {
    const { file, body } = args;

    try {
      let upload: UploadRes = await this.awsService.upload(file);

      const { folderId } = body;

      const storage = await this.prisma.storage.create({
        data: {
          name: file.originalname,
          type: StorageType.FILE,
          parentId: +folderId || null,
          file: upload.Key,
          mimeType: file.mimetype,
          size: file.size,
        },
      });

      return storage;
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  async removeFile(id: number) {
    const storage = await this.prisma.storage.findUnique({
      where: { id },
    });

    if (!storage) {
      throw new BadRequestException('File not found');
    }

    await this.prisma.storage.delete({
      where: { id },
    });

    return { success: true };
  }

  async renameFile({ name, id }: RenameFileDto) {
    const storage = await this.prisma.storage.update({
      where: { id },
      data: { name },
    });

    return storage;
  }

  async moveFile(data: MoveFileDto) {
    let { originId, destinationId } = data;

    const storage = await this.prisma.storage.update({
      where: { id: originId },
      data: { parentId: destinationId },
    });

    return storage;
  }

  async getTotalStorageSize() {
    const totalSize = await this.prisma.storage.aggregate({
      _sum: {
        size: true,
      },
    });

    return totalSize._sum;
  }
}
