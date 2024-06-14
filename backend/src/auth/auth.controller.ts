import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserRegDto } from '../dto/userReg.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from '../dto/userLogin.dto';
import { Request } from 'express';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import AuthStatusInterface from './interfaces/auth-status.interface';
import { VerificationService } from '../verification/verification.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly verificationService: VerificationService,
  ) {}

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

  @UseGuards(AccessTokenGuard)
  @Get('verificate')
  async verificate(@Query() code: string): Promise<any> {
    await this.verificationService.confirmUser(code);
  }
}
