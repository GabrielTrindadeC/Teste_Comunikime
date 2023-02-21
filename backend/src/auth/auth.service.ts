import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ForgetPwdDto } from './dto/forgetPwd.dto';
import { ResetPwdDto } from './dto/resetPwd.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(createUserDto: RegisterDto) {
    const hashedPwd = await bcrypt.hash(createUserDto.password, 12);
    return this.usersService.create({
      ...createUserDto,
      password: hashedPwd,
    });
  }
  async createToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      address: user.address,
      phone: user.phone,
    };
    return {
      access_token: this.jwt.sign(payload),
    };
  }
  checkToken(token: string) {
    try {
      return this.jwt.verify(token);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
  async login(credentials: LoginDto) {
    const user = await this.usersService.findOneByEmail(credentials.email);
    if (!bcrypt.compareSync(credentials.password, user.password)) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const jwtToken = this.createToken(user);
    return jwtToken;
  }

  async forget(credentials: ForgetPwdDto) {
    const user = await this.usersService.findOneByEmail(credentials.email);
    return true;
  }

  async reset(credentials: ResetPwdDto, id: number) {
    const hashedPwd = await bcrypt.hash(credentials.password, 12);
    await this.usersService.update(id, { password: hashedPwd });
    return { message: 'password successfully changed ' };
  }
}
