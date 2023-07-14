import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/posts/entities/comment.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  email: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @Field(() => Profile)
  profile: Profile;

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn()
  @Field(() => [Post], { nullable: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  @JoinColumn()
  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}
