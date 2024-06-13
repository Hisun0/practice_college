import { Controller } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Post('/add')
  // add(@Body() user: UserDto): void {
  //   this.userService.add(user);
  // }
}
