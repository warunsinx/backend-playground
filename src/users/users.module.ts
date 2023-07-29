import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { UsersResolver } from './users.resolver';
import { Post } from '../posts/entities/post.entity';
import { BullModule } from '@nestjs/bull';
import { UserConsumer } from './users.consumer';
import { BullBoardModule } from '@bull-board/nestjs';
import { BullAdapter } from '@bull-board/api/bullAdapter';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'testQueue',
      limiter: {
        max: 2,
        duration: 10000,
      },
    }),
    // BullBoardModule.forFeature({ name: 'testQueue', adapter: BullAdapter }),
    TypeOrmModule.forFeature([User, Profile, Post]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver, UserConsumer],
  exports: [UsersService],
})
export class UsersModule {}
