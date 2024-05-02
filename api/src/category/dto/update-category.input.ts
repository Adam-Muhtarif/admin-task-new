import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}
