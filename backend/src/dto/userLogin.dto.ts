import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Length(8, 255)
  password: string;
}
