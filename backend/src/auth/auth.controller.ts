import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRegDto } from 'src/user/dto/userReg.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from '../user/dto/userLogin.dto';
import { Request } from 'express';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import AuthStatusInterface from './interfaces/auth-status.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // регистрация
  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  async signUp(@Body() userRegDto: UserRegDto): Promise<AuthStatusInterface> {
    const result = await this.authService.signUp(userRegDto);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.CONFLICT);
    }

    return result;
  }

  // логин
  @Post('signIn')
  async signIn(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<AuthStatusInterface> {
    const result = await this.authService.signIn(userLoginDto);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.CONFLICT);
    }

    return result;
  }

  // выход из аккаунта
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@Req() request: Request): Promise<AuthStatusInterface> {
    const userId = request.user['sub'];
    const result = await this.authService.logout(userId);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  // обновление refreshToken
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refresh(@Req() request: Request): Promise<AuthStatusInterface> {
    const userId = request.user['sub'];
    const refreshToken = request.user['refreshToken'];
    const result = await this.authService.refreshTokens(userId, refreshToken);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }
}
