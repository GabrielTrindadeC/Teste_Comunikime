import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
// import { ForgetPwdDto } from './dto/forgetPwd.dto';
import { ResetPwdDto } from './dto/resetPwd.dto';
import { AuthGuard } from './Guard/auth.guard';
import { UserInfo } from '../decorator/user.decorator';
import { User } from '../users/entities/user.entity';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @UseGuards(AuthGuard)
  @Get('valid')
  async isValid(@Headers() headers) {
    const authorization = headers['authorization'];
    return {
      isValid: this.authService.isValidToken(
        (authorization ?? '').split(' ')[1],
      ),
    };
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }
  // @Post('forget')
  // async forgetPwd(@Body() body: ForgetPwdDto) {
  //   return this.authService.forget(body);
  // }
  @UseGuards(AuthGuard)
  @Patch('reset')
  async reset(@UserInfo() { id }: User, @Body() body: ResetPwdDto) {
    return this.authService.reset(body, id);
  }
}
