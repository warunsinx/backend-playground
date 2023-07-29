import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/users/entities/user.entity';
import { getQueueToken } from '@nestjs/bull';
import { Profile } from '../src/users/entities/profile.entity';
import { Post } from '../src/posts/entities/post.entity';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  const mockTestQueue = {
    add: jest.fn().mockImplementation((_, dto) => {
      return Promise.resolve({ finished: () => Promise.resolve(dto) });
    }),
  };
  const mockUserRepository = {
    find: jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    }),
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((dto) => dto),
  };
  const mockProfileRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((dto) => dto),
  };
  const mockPostRepository = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
      providers: [
        {
          provide: getQueueToken('testQueue'),
          useValue: mockTestQueue,
        },
      ],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .overrideProvider(getRepositoryToken(Profile))
      .useValue(mockProfileRepository)
      .overrideProvider(getRepositoryToken(Post))
      .useValue(mockPostRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        disableErrorMessages: false,
        dismissDefaultMessages: false,
      }),
    );
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect([]);
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'hello@world.com',
        firstname: 'Hello',
        lastname: 'World',
      })
      .expect(201)
      .expect({
        email: 'hello@world.com',
        profile: { firstname: 'Hello', lastname: 'World' },
      });
  });
});
