import { IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @Length(3, 255)
  username: string;

  @IsNotEmpty()
  @Length(8, 255)
  password: string;
}
