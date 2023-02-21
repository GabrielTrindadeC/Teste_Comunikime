import { IsEmail, IsNotEmpty } from 'class-validator';
export class ForgetPwdDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
