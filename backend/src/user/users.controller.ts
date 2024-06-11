import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './users.entity';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/add')
  add(@Body() user: UserEntity): void {
    this.userService.add(user);
  }
}
