import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Tag } from './tag.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Post {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column('text', { nullable: false })
  @Field()
  content: string;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  @Field(() => [User], { nullable: true })
  comments: Comment[];

  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable({
    name: 'post_tags',
  })
  @Field(() => [Tag])
  tags: Tag[];
}
