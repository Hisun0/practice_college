import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserRegDto } from '../dto/userReg.dto';

import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../dto/userLogin.dto';
import { jwtConstants } from './constants';
import AuthStatusInterface from './interfaces/auth-status.interface';
import capitalize from './utils/capitalize';
import { EmailService } from '../email/email.service';
import SignUpServiceInterface from './interfaces/signUp-service.interface';
import TokenServiceInterface from './interfaces/token-service.interface';
import SignInServiceInterface from './interfaces/signIn-service.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async signIn(userLoginDto: UserLoginDto): Promise<SignInServiceInterface> {
    const user = await this.usersService.findOneByUserName(
      userLoginDto.userName,
    );

    if (user === null || user.userName !== userLoginDto.userName) {
      return {
        success: false,
        message: 'Invalid username',
      };
    }

    const match = await bcrypt.compare(
      userLoginDto.password,
      user.passwordHash,
    );

    if (!match) {
      // не совпал пароль
      return {
        success: false,
        message: 'Invalid password',
      };
    }

    const tokens = await this.getTokens(user.id, user.userName);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      success: true,
      message: 'Successfully logged in',
      accessToken: tokens.accessToken,
    };
  }

  async signUp(userRegDto: UserRegDto): Promise<SignUpServiceInterface> {
    const { email, userName, password, firstName, lastName } = userRegDto;

    if (await this.usersService.existsByEmail(email)) {
      return {
        success: false,
        message: 'Email already exists',
      };
    }

    if (await this.usersService.existsByUsername(userName)) {
      return {
        success: false,
        message: 'Username already exists',
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new UserEntity(
      email.toLowerCase().trim(),
      userName,
      passwordHash,
      capitalize(firstName).trim(),
      capitalize(lastName).trim(),
    );

    const newUser = await this.usersService.add(user);
    // подтвержение email на почту
    const emailConfirmationResponse = await this.emailService.send(newUser);

    if (!emailConfirmationResponse.success) {
      // TODO: не отправилось письмо с подтверждением на почту, нужно что-то решать
      console.log(emailConfirmationResponse);
    }

    const tokens = await this.getTokens(newUser.id, newUser.userName);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return {
      success: true,
      message: 'Registration successful',
      tokens,
      email_confirmation: emailConfirmationResponse,
    };
  }

  async logout(userId: number): Promise<AuthStatusInterface> {
    await this.usersService.update(userId, { refreshToken: null });
    return {
      success: true,
      message: 'Logged out',
    };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.usersService.update(userId, {
      refreshToken,
    });
  }

  async getTokens(userId: number, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.refreshToken,
          expiresIn: '40d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(
    userId: number,
    refreshToken: string,
  ): Promise<TokenServiceInterface> {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.refreshToken) {
      return {
        success: false,
        message: 'Access denied',
      };
    }

    if (refreshToken === user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.userName);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      success: true,
      message: 'Token refreshed',
      tokens,
    };
  }
}
