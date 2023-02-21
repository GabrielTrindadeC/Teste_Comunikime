import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { userRepositoryMock } from '../../test/mock/User_repository.mock';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userRepositoryMock],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
});
