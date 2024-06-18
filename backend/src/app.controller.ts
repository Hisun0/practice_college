import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthDTO } from './dto/auth.dto';
import { AddUserDTO } from './dto/addUser.dto';
import { EditUserDTO } from './dto/editUser.dto';

/*
  get для всех товаров
  get для определенного товара (страница товара)
  
  post для регистрации ✔️
  post для авторизации ✔️
  post для изменения данных пользователя ✔️
*/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/addUser')
  addUser(@Body() body: AddUserDTO): object {
    const { login, password } = body;
    return [login, password];
  }

  @Post('/authentication')
  authenticationUser(@Body() body: AuthDTO): object {
    const {login, password} = body;
    return [login, password];
  }

  @Post('/edit/:id')
  editUser(@Body() body: EditUserDTO, @Param('id') id: string): object {
    const {login, password} = body;
    return [login, password, id];
  }

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }
}
