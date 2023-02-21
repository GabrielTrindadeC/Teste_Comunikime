import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (e) {
      if (
        e instanceof QueryFailedError &&
        e.message.includes('Duplicate entry ')
      ) {
        throw new UnprocessableEntityException('Email already in use');
      } else {
        throw e;
      }
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }
  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneOrFail({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.userRepository.merge(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }
}
