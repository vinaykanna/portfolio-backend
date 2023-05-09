import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';
import { CloudStorageModule } from './cloud-storage/cloud-storage.module';
import { FormsModule } from './forms/forms.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

const username = encodeURIComponent(process.env.MONGO_DB_USERNAME);
const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);
const DB_NAME = process.env.MONGO_DB_NAME;
const DB_HOST = process.env.MONGO_DB_HOST;
const AUTH = `${username}:${password}`;
const DB = `${DB_HOST}/${DB_NAME}`;
const MONGO_URI = `mongodb+srv://${AUTH}@${DB}?retryWrites=true&w=majority`;

export function mongo_config() {
  const username = encodeURIComponent(process.env.MONGO_DB_USERNAME);
  const password = encodeURIComponent(process.env.MONGO_DB_PASSWORD);
  const DB_NAME = process.env.MONGO_DB_NAME;
  const DB_HOST = process.env.MONGO_DB_HOST;
  const AUTH = `${username}:${password}`;
  const DB = `${DB_HOST}/${DB_NAME}`;
  const MONGO_URI = `mongodb+srv://${AUTH}@${DB}?retryWrites=true&w=majority`;

  return {
    MONGO_URI,
  };
}

ConfigModule.forRoot({
  load: [mongo_config],
  expandVariables: true,
});

@Module({
  imports: [
    MongooseModule.forRoot(mongo_config().MONGO_URI),
    CloudStorageModule,
    FormsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
