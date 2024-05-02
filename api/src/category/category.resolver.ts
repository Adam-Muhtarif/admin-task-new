import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryType } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => CategoryType)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => CategoryType)
  createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Query(() => [CategoryType], { name: 'categories', nullable: true })
  findAll() {
    return this.categoryService.findAll();
  }

  @Query(() => CategoryType, { name: 'category', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(+id);
  }

  @Mutation(() => CategoryType)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(
      +updateCategoryInput.id,
      updateCategoryInput,
    );
  }

  @Mutation(() => CategoryType)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.remove(+id);
  }
}
