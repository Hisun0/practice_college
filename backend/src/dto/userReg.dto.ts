import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserRegDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8, 255)
  password: string;

  firstName: string;
  lastName: string;
}
