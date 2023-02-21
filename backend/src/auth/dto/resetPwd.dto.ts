import { IsNotEmpty } from 'class-validator';
export class ResetPwdDto {
  @IsNotEmpty()
  password: string;
}
