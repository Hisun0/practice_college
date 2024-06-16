import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersController } from './user/user.controller';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import config from './config/config';
import { ProductController } from './product/product.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'daniil',
      password: 'divaan',
      database: 'postgres',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController, UsersController, AuthController, ProductController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
