import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from './user.entity';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/addUser')
  add(@Body() user: UserEntity): void {
    this.userService.add(user);
  }
}
