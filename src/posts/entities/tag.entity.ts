import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './post.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Tag {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column('text', { nullable: false })
  @Field()
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  @Field(() => [Post])
  posts: Post[];
}
