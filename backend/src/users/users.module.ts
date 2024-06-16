import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { FeedbackEntity } from '../feedback/entities/feedback.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, FeedbackEntity])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
