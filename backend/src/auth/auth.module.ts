import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';
import { UsersModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { EmailService } from '../email/email.service';
import { VerificationService } from '../verification/verification.service';
import { VerificationEntity } from '../verification/verification.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([VerificationEntity]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    EmailService,
    VerificationService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
