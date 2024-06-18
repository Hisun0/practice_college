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
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserRegDto } from '../dto/userReg.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from '../dto/userLogin.dto';
import { Request, Response } from 'express';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { RefreshTokenGuard } from './guards/refreshToken.guard';
import AuthStatusInterface from './interfaces/auth-status.interface';
import { VerificationService } from '../verification/verification.service';
import SignUpStatus from './interfaces/signUp-status.interface';
import SignInControllerInterface from './interfaces/signIn-controller.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly verificationService: VerificationService,
  ) {}

  // регистрация
  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  async signUp(
    @Res({ passthrough: true }) response: Response,
    @Body() userRegDto: UserRegDto,
  ): Promise<SignUpStatus> {
    const result = await this.authService.signUp(userRegDto);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.CONFLICT);
    }

    const {
      email_confirmation,
      tokens: { accessToken, refreshToken },
    } = result;
    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: 'auth',
      maxAge: 40 * 24 * 60 * 60, // токен живет 40 дней, а вычисление нужно для перевода дней в секунды
    });

    return {
      success: true,
      message: 'Registration successful',
      status: HttpStatus.CREATED,
      accessToken,
      email_confirmation,
    };
  }

  // логин
  @Post('signIn')
  async signIn(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<SignInControllerInterface> {
    const result = await this.authService.signIn(userLoginDto);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.CONFLICT);
    }

    return {
      success: true,
      message: result.message,
      status: HttpStatus.OK,
      accessToken: result.accessToken,
    };
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

  // подтверждение пользователя с email рассылки
  @UseGuards(AccessTokenGuard)
  @Get('verificate')
  async verificate(
    @Query() query: { code: string },
  ): Promise<AuthStatusInterface> {
    return await this.verificationService.confirmUser(query.code);
  }
}
