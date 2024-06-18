import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationEntity } from './verification.entity';
import { UsersModule } from '../users/users.module';
import { UserEntity } from '../users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([VerificationEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class VerificationModule {}
