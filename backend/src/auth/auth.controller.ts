import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserRegDto } from 'src/user/dto/userReg.dto';
import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
import { UserLoginDto } from '../user/dto/userLogin.dto';

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
}
