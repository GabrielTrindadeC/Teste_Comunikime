import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../src/users/entities/user.entity';
import { Role } from '../../src/enum/role.enum';
export const userEntityMock: User[] = [
  {
    email: 'teste3@gmail.com',
    password: '$2a$12$Pz4wSOUFIFR3rx/mQGKtCefPTfF2KaZOsvakVk5kyNam1GaQLtkPq',
    name: 'usuarioTeste',
    address: 'Rua pedro de oliveira cavalcante 22',
    phone: '11951145582',
    id: 17,
    role: Role.User,
  },
  {
    email: 'admin@gmail.com',
    password: '$2a$12$Pz4wSOUFIFR3rx/mQGKtCefPTfF2KaZOsvakVk5kyNam1GaQLtkPq',
    name: 'usuarioTeste',
    address: 'Rua pedro de oliveira cavalcante 22',
    phone: '11951145582',
    id: 18,
    role: Role.Admin,
  },
];
export const userRepositoryMock = {
  provide: getRepositoryToken(User),
  useValue: {
    save: jest.fn(),
    find: jest.fn(),
    findOneOrFail: jest.fn(),
    merge: jest.fn(),
    delete: jest.fn(),
  },
};
