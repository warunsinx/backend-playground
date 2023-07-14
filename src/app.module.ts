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
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      include: [UsersModule, PostsModule],
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    PostsModule,
    TypeOrmModule.forFeature([User, Profile, Post, Comment, Tag]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
