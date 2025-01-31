import { User } from '../entities/user.entity';

describe('UsersService', () => {
  // ... autres imports et code

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
            findByEmail: jest.fn<Promise<User | undefined>, [string]>(),
            remove: jest.fn(),
          },
        },
        PasswordService,
      ],
    }).compile();
  });
}); 