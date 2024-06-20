import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'node:fs';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { cwd } from 'node:process';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(`${cwd()}/etc/nginx/certificate/key.pem`),
    cert: fs.readFileSync(`${cwd()}/etc/nginx/certificate/cert.pem`),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.use(cookieParser('secret'));
  app.enableCors({
    origin: 'https://mentally-prime-possum.ngrok-free.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
