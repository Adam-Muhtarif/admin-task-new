import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostType } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Resolver(() => PostType)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostType)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return await this.postService.create(createPostInput);
  }

  @Query(() => [PostType], { name: 'posts', nullable: true })
  findAll() {
    return this.postService.findAll();
  }

  @Query(() => [PostType], { name: 'postsByCategory', nullable: true })
  findByCategory(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findByCategory(+id);
  }

  @Query(() => PostType, { name: 'post', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(+id);
  }

  @Mutation(() => PostType)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(+updatePostInput.id, updatePostInput);
  }

  @Mutation(() => PostType)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(+id);
  }
}
