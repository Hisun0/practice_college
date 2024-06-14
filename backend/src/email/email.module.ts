import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import * as process from 'node:process';
import { VerificationService } from '../verification/verification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationEntity } from '../verification/verification.entity';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.yandex.ru',
          port: 465,
          auth: {
            user: 'tr1dv4@yandex.ru',
            pass: 'erktkwvznjycpoyo',
          },
        },
        defaults: {
          from: '"nest-modules" <modules@nestjs.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: false,
          },
        },
      }),
    }),
    TypeOrmModule.forFeature([VerificationEntity]),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [EmailService, VerificationService],
  exports: [EmailService],
})
export class EmailModule {}
