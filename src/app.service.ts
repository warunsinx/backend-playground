import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './users/entities/profile.entity';
import { Post } from './posts/entities/post.entity';
import { Comment } from './posts/entities/comment.entity';
import { Tag } from './posts/entities/tag.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Profile) private profilesRepository: Repository<Profile>,
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
    @InjectRepository(Tag) private tagsRepository: Repository<Tag>,
  ) {}

  async seed() {
    const profile = this.profilesRepository.create({
      firstname: 'John',
      lastname: 'Doe',
    });
    await this.profilesRepository.save(profile);

    const user = this.usersRepository.create({
      email: 'johndoe@gmail.com',
      profile: profile,
    });
    await this.usersRepository.save(user);

    const tag = this.tagsRepository.create({ name: 'code' });
    await this.tagsRepository.save(tag);

    const post = this.postsRepository.create({
      content: 'Hello World',
      user: user,
      tags: [tag],
    });
    await this.postsRepository.save(post);

    const comment = this.commentsRepository.create({
      content: 'Welcome to the world !',
      user: user,
      post: post,
    });
    await this.commentsRepository.save(comment);

    return 'Seeded the database!';
  }

  async testFindOption() {
    return this.usersRepository.find({
      select: {
        id: true,
        profile: { id: true },
        posts: { id: true, comments: { id: true }, tags: { id: true } },
        comments: { id: true },
      },
      relations: {
        profile: true,
        posts: { comments: true, tags: true },
        comments: true,
      },
      where: { posts: { id: 1 }, comments: { id: 1 } },
    });
  }

  async testQueryBuilder() {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('user.posts', 'post')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoinAndSelect('post.tags', 'tag')
      .leftJoinAndSelect('user.comments', 'userComment')
      .select([
        'user.id',
        'profile.id',
        'post.id',
        'comment.id',
        'tag.id',
        'userComment.id',
      ])
      .where('post.id = :id', { id: 1 })
      .andWhere('comment.id = :id', { id: 1 })
      .getMany();
  }
}
