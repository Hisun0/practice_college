import { ForbiddenException, HttpStatus, Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { UserRegDto } from 'src/dto/userReg.dto';

import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../dto/userLogin.dto';
import { jwtConstants } from './constants';
import { response } from 'express';
import Registration from './interfaces/auth-status.interface';
import AuthStatusInterface from './interfaces/auth-status.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userLoginDto: UserLoginDto): Promise<AuthStatusInterface> {
    const user = await this.usersService.findOneByUserName(
      userLoginDto.userName,
    );
    const { userName, passwordHash } = user;

    if (userName !== userLoginDto.userName) {
      // не совпал никнейм
      return {
        success: false,
        message: 'Invalid username',
      };
    }

    const match = await bcrypt.compare(userLoginDto.password, passwordHash);

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
      tokens,
    };
  }

  async signUp(userRegDto: UserRegDto): Promise<AuthStatusInterface> {
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
      email,
      userName,
      passwordHash,
      firstName,
      lastName,
    );

    const newUser = await this.usersService.add(user);

    const tokens = await this.getTokens(newUser.id, newUser.userName);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return {
      success: true,
      message: 'Registration successful',
      tokens,
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
    const hashRefreshedToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(userId, {
      refreshToken: hashRefreshedToken,
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
          expiresIn: '7d',
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
  ): Promise<AuthStatusInterface> {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.refreshToken) {
      return {
        success: false,
        message: 'Access denied',
      };
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.userName);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return {
      success: true,
      message: 'Token refreshed',
      tokens,
    };
  }
}
