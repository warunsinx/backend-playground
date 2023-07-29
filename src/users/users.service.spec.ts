import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { getQueueToken } from '@nestjs/bull';

describe('UsersService', () => {
  let service: UsersService;

  const mockTestQueue = {
    add: jest.fn().mockImplementation((_, dto) => {
      return Promise.resolve({ finished: () => Promise.resolve(dto) });
    }),
  };
  const mockUserRepository = {};
  const mockProfileRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getQueueToken('testQueue'),
          useValue: mockTestQueue,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Profile),
          useValue: mockProfileRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const dto = {
      firstname: 'Hello',
      lastname: 'World',
      email: 'warunsinx@gmail.com',
    };
    expect(await service.create(dto)).toEqual(dto);
  });
});
