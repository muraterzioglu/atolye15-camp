import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ContentsService } from './contents.service';
import { Contents } from './entities/content.entity';
import { CreateContentInput } from './dto/create-content.input';
import { Author } from '../authors/entities/author.entity';
import { AuthorsService } from '../authors/authors.service';
import { ReactionsService } from '../reactions/reactions.service';
import { Reaction } from '../reactions/entities/reaction.entity';

@Resolver(() => Contents)
export class ContentsResolver {
  constructor(
    private readonly contentsService: ContentsService,
    private readonly authorService: AuthorsService,
    private readonly reactionServices: ReactionsService,
  ) {}

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

  @ResolveField('content_author', () => Author)
  async content_author(@Parent() contents: Contents): Promise<Author> {
    const { content_author } = contents;
    return this.authorService.findOne(content_author);
  }

  @ResolveField('content_reactions', () => [Reaction], {
    description: 'All the reactions made by author',
  })
  async content_reactions(
    @Parent() { content_id }: Contents,
  ): Promise<Reaction[]> {
    return await this.reactionServices.findReactionsByContent(content_id);
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
