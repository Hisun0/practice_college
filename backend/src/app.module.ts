import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';
import { VerificationModule } from './verification/verification.module';
import { UsersModule } from './users/users.module';
import { FeedbackModule } from './feedback/feedback.module';
import config from './config/config';
import * as process from 'node:process';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { PriceModule } from './price/price.module';
import { PriceController } from './price/price.controller';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME || 'daniil',
      password: process.env.DATABASE_PASSWORD || 'divaan',
      database: 'postgres',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    EmailModule,
    VerificationModule,
    FeedbackModule,
    ProductModule,
    PriceModule,
    FavoritesModule
  ],
  controllers: [AppController, UsersController, AuthController, ProductController, PriceController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
