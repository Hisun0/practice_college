import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { VerificationService } from '../verification/verification.service';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../users/entities/user.entity';
import { DataSource } from 'typeorm';
import AuthStatusInterface from '../auth/interfaces/auth-status.interface';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly verificationService: VerificationService,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  async send(user: UserEntity): Promise<AuthStatusInterface> {
    // queryRunner стартует транзакцию
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    // const result: AuthStatusInterface = {};

    try {
      const baseUrl = this.configService.get<string>('baseUrl');
      const verificationCode =
        this.verificationService.createVerificationCode();
      const link = `${baseUrl}/auth/verificate?code=${verificationCode}`;

      await this.verificationService.saveUserAndVerificationCode(
        user.id,
        user.email,
        verificationCode,
      );

      const splittedDirname = __dirname.split('/');

      await this.mailerService.sendMail({
        to: user.email,
        from: 'tr1dv4@yandex.ru',
        subject: 'Email confirmation',
        template:
          splittedDirname.slice(0, splittedDirname.length - 1).join('/') +
          '/templates/email_confirmation.template.pug',
        context: {
          username: user.userName,
          urlConfirmLink: link,
        },
      });

      return {
        success: true,
        message: 'Email sent successfully!',
      };
    } catch (error) {
      // отменяем запрос
      await queryRunner.rollbackTransaction();
      return {
        success: false,
        message: error,
      };
    } finally {
      await queryRunner.release();
    }
  }
}
