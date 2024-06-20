import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('secret'));
  app.enableCors();
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
