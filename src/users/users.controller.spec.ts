import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      return { id, ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const dto = {
      email: 'warunsinx@gmail.com',
      firstname: 'warun',
      lastname: 'sinx',
    };
    expect(controller.create(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
    expect(mockUsersService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a user', () => {
    const dto = {
      firstname: 'Hello',
      lastname: 'World',
    };
    expect(controller.update('1', dto)).toEqual({ id: 1, ...dto });
    expect(mockUsersService.update).toHaveBeenCalled();
  });
});
