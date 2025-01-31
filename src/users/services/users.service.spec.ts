import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../repositories/users.repository';
import { PasswordService } from '../utils/password.utils';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findByEmail: jest.fn(),
            remove: jest.fn(),
          },
        },
        PasswordService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user by email', async (): Promise<void> => {
    const mockUser = {
      id: 1,
      email: 'test@test.com',
      firstName: 'Test',
      lastName: 'User',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const findByEmailSpy = jest
      .spyOn(repository, 'findByEmail')
      .mockResolvedValue(mockUser);

    const result = await service.findByEmail('test@test.com');
    expect(findByEmailSpy).toHaveBeenCalledWith('test@test.com');
    expect(result).toEqual(mockUser);
  });

  // Ajoutez d'autres tests ici
});
