import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
<<<<<<< HEAD
import { ProductModule } from './product/product.module';
import config from './config/config';
import { ProductController } from './product/product.controller';
=======
import { EmailModule } from './email/email.module';
import { VerificationModule } from './verification/verification.module';
import { UsersModule } from './users/users.module';
import { FeedbackModule } from './feedback/feedback.module';
import config from './config/config';
import * as process from 'node:process';
>>>>>>> 52adb18b6f6e66278094ddfe4587447b4daf2d29

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
<<<<<<< HEAD
      host: 'localhost',
      port: 5432,
      username: 'daniil',
      password: 'divaan',
=======
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME || 'divaan',
      password: process.env.DATABASE_PASSWORD || 'divaan',
>>>>>>> 52adb18b6f6e66278094ddfe4587447b4daf2d29
      database: 'postgres',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
<<<<<<< HEAD
    ProductModule,
=======
    EmailModule,
    VerificationModule,
    FeedbackModule,
>>>>>>> 52adb18b6f6e66278094ddfe4587447b4daf2d29
  ],
  controllers: [AppController, UsersController, AuthController, ProductController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
