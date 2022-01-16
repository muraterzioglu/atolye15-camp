import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContentsService } from './contents.service';
import { Contents } from './entities/content.entity';
import { CreateContentInput } from './dto/create-content.input';

@Resolver(() => Contents)
export class ContentsResolver {
  constructor(private readonly contentsService: ContentsService) {}

  @Mutation(() => Contents)
  createContent(
    @Args('createContentInput') createContentInput: CreateContentInput,
  ) {
    return this.contentsService.create(createContentInput);
  }

  @Query(() => [Contents], { name: 'contents' })
  async findAll(
    @Args('content_type', { nullable: true, type: () => String })
    content_type: 'comment' | 'post',
  ) {
    return await this.contentsService.findAll(content_type);
  }

  @Query(() => Contents, { name: 'content' })
  async findOne(
    @Args('content_id', { type: () => String }) content_id: string,
  ) {
    return await this.contentsService.findOne(content_id);
  }

  @Mutation(() => Contents)
  removeContent(
    @Args('content_id', { type: () => String }) content_id: string,
  ) {
    return this.contentsService.remove(content_id);
  }
}
