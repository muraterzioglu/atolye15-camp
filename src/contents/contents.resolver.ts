import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContentsService } from './contents.service';
import { Content } from './entities/content.entity';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';

@Resolver(() => Content)
export class ContentsResolver {
  constructor(private readonly contentsService: ContentsService) {}

  @Mutation(() => Content)
  createContent(
    @Args('createContentInput') createContentInput: CreateContentInput,
  ) {
    return this.contentsService.create(createContentInput);
  }

  @Query(() => [Content], { name: 'contents' })
  findAll() {
    return this.contentsService.findAll();
  }

  @Query(() => Content, { name: 'content' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contentsService.findOne(id);
  }

  @Mutation(() => Content)
  updateContent(
    @Args('updateContentInput') updateContentInput: UpdateContentInput,
  ) {
    return this.contentsService.update(
      updateContentInput.id,
      updateContentInput,
    );
  }

  @Mutation(() => Content)
  removeContent(@Args('id', { type: () => Int }) id: number) {
    return this.contentsService.remove(id);
  }
}
