import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserEntity } from './user.entity';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/add')
  add(@Body() user: UserEntity): void {
    this.userService.add(user);
  }
}
