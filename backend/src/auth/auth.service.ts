import {HttpStatus, Injectable} from '@nestjs/common';
import { UsersService } from 'src/user/user.service';
import { UserRegDto } from 'src/user/dto/userReg.dto';

import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import {UserLoginDto} from "../user/dto/userLogin.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userLoginDto: UserLoginDto): Promise<any> {
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

    const payload = { sub: user.id, username: userName };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
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

    await this.usersService.add(user);
    return user;
  }
}
