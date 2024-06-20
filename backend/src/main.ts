import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'node:fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('/etc/certificate/key.pem'),
    cert: fs.readFileSync('/etc/certificate/cert.pem'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.use(cookieParser('secret'));
  app.enableCors({
    origin: 'https://champion-ladybird-formally.ngrok-free.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
