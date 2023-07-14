import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Post } from 'src/posts/entities/post.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
    @InjectRepository(Post)
    private readonly postsRespository: Repository<Post>,
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserDto,
  ): Promise<Profile> {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.remove(id);
  }

  @ResolveField(() => Profile)
  async profile(@Parent() user: User): Promise<Profile> {
    return this.profilesRepository.findOne({ where: { user } });
  }

  @ResolveField(() => Post)
  async posts(@Parent() user: User): Promise<Post[]> {
    return this.postsRespository.find({ where: { user } });
  }
}
