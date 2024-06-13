import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'node:fs';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('../certificate/key.pem'),
    cert: fs.readFileSync('../certificate/cert.pem'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.use(cookieParser('secret'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
