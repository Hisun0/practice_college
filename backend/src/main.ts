import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'node:fs';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { NextFunction, Response } from 'express';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./certificate/key.pem'),
    cert: fs.readFileSync('./certificate/cert.pem'),
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.use(cookieParser('secret'));
  app.enableCors({
    origin: 'https://mentally-prime-possum.ngrok-free.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.setGlobalPrefix('/api');
  // app.use((req: Request, response: Response, next: NextFunction) => {
  //   response.header('Access-Control-Allow-Credentials', 'true');
  //   next();
  // });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
