import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/add')
  add(@Body() user: UserDto): void {
    this.userService.add(user);
  }
}
