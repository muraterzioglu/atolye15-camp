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
import { HttpException, HttpStatus } from '@nestjs/common';

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
    content_type: 'comment' | 'post' | 'all',
  ) {
    return await this.contentsService.findAll(content_type);
  }

  @ResolveField('content_author', () => Author)
  async content_author(@Parent() { author }: Contents): Promise<Author> {
    return this.authorService.findOne(author);
  }

  @ResolveField('content_comments', () => [Contents], {
    description: 'All the comments made for post',
  })
  async content_comments(@Parent() { id }: Contents): Promise<Contents[]> {
    const content = await this.contentsService.findOne(id);
    if (content.type == 'comment') {
      throw new HttpException(
        "Forbidden Action: Comments can't have sub-comments. content_comment is only accessible by posts",
        HttpStatus.FORBIDDEN,
      );
    } else return await this.contentsService.findPostComments(id);
  }

  @ResolveField('reactions', () => [Reaction], {
    description: 'All the reactions made by author',
  })
  async reactions(@Parent() { id }: Contents): Promise<Reaction[]> {
    return await this.reactionServices.findReactionsByContent(id);
  }

  @Query(() => Contents, { name: 'content' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return await this.contentsService.findOne(id);
  }

  @Mutation(() => Contents)
  removeContent(@Args('id', { type: () => String }) id: string) {
    return this.contentsService.remove(id);
  }
}
