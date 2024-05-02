import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostType } from 'src/post/entities/post.entity';

@ObjectType('Category')
export class CategoryType {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [PostType])
  posts?: PostType[];

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;
}
