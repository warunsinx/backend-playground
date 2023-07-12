import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { dataSourceOptions } from 'db/data-source';
import { PostsModule } from './posts/posts.module';
import { User } from './users/entities/user.entity';
import { Profile } from './users/entities/profile.entity';
import { Post } from './posts/entities/post.entity';
import { Comment } from './posts/entities/comment.entity';
import { Tag } from './posts/entities/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    PostsModule,
    TypeOrmModule.forFeature([User, Profile, Post, Comment, Tag]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
