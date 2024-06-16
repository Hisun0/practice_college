import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { VerificationEntity } from './verification.entity';
import { UserEntity } from '../users/entities/user.entity';
import AuthStatusInterface from '../auth/interfaces/auth-status.interface';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(VerificationEntity)
    private readonly verificationRepository: Repository<VerificationEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  createVerificationCode(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  saveUserAndVerificationCode(
    userId: number,
    email: string,
    code: string,
  ): Promise<VerificationEntity> {
    const verificationEntity = new VerificationEntity(userId, email, code);
    return this.verificationRepository.save(verificationEntity);
  }

  async confirmUser(code: string): Promise<AuthStatusInterface> {
    const userByCode = await this.verificationRepository.findOne({
      where: { code },
    });

    if (!userByCode) {
      return {
        success: false,
        message: 'User not found',
      };
    }

    await this.userRepository.update(userByCode.userId, {
      isEmailConfirmed: true,
    });

    return {
      success: true,
      message: 'Successfully confirmed',
    };
  }
}
