import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserRegDto } from 'src/user/dto/userReg.dto';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
import { UserLoginDto } from '../user/dto/userLogin.dto';
import { Response } from 'express';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  async signUp(@Body() userRegDto: UserRegDto): Promise<UserEntity> {
    return await this.authService.signUp(userRegDto);
  }

  @Post('signIn')
  async signIn(
    @Body() userLoginDto: UserLoginDto,
    @Res() response: Response,
  ): Promise<any> {
    return await this.authService.signIn(userLoginDto, response);
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(): void {
    // TODO: метод для выхода из аккаунта
  }

  @UseGuards(AccessTokenGuard)
  @Get('refresh')
  refresh(): void {
    // TODO: метод для обновления refresh токена
  }
}
