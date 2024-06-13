import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRegDto } from 'src/user/dto/userReg.dto';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
import { UserLoginDto } from '../user/dto/userLogin.dto';
import { Request } from 'express';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  async signUp(@Body() userRegDto: UserRegDto): Promise<UserEntity> {
    return await this.authService.signUp(userRegDto);
  }

  @Post('signIn')
  async signIn(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return await this.authService.signIn(userLoginDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(): void {
    // TODO: метод для выхода из аккаунта
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(
    @Req() request: Request,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // TODO: метод для обновления refresh токена
    const userId = request.user['sub'];
    const refreshToken = request.user['refreshToken'];
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
