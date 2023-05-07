import { Module } from '@nestjs/common';
import { CloudStorageController } from './cloud-storage.controller';
import { CloudStorageService } from './cloud-storage.service';
import { PrismaService } from 'prisma/prisma.service';
import { AwsService } from './aws.service';

@Module({
  imports: [],
  controllers: [CloudStorageController],
  providers: [CloudStorageService, PrismaService, AwsService],
})
export class CloudStorageModule {}
