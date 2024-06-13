import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { UserRegDto } from 'src/user/dto/userReg.dto';

import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../user/dto/userLogin.dto';
import { Response } from 'express';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    userLoginDto: UserLoginDto,
    @Res() response: Response,
  ): Promise<any> {
    const user = await this.usersService.findOneByUserName(
      userLoginDto.userName,
    );
    const { userName, passwordHash } = user;

    if (userName !== userLoginDto.userName) {
      // не совпал никнейм
      return HttpStatus.BAD_REQUEST;
    }

    const match = await bcrypt.compare(userLoginDto.password, passwordHash);

    if (!match) {
      // не совпал пароль
      return HttpStatus.BAD_REQUEST;
    }

    const tokens = await this.getTokens(user.id, user.userName);
    await this.updateRefreshToken(user.id, user.refreshToken);
    return tokens;
  }

  async signUp(userRegDto: UserRegDto): Promise<any> {
    const { password } = userRegDto;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new UserEntity(
      userRegDto.email,
      userRegDto.userName,
      passwordHash,
      userRegDto.firstName,
      userRegDto.lastName,
    );

    const newUser = await this.usersService.add(user);

    const tokens = await this.getTokens(newUser.id, newUser.userName);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number): Promise<any> {
    await this.usersService.update(userId, { refreshToken: null });
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
}
