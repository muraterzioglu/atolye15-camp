import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { Contents } from '../contents/entities/content.entity';
import { ContentsService } from '../contents/contents.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ReactionsService } from '../reactions/reactions.service';
import { Reaction } from '../reactions/entities/reaction.entity';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly contentsService: ContentsService,
    private readonly reactionServices: ReactionsService,
  ) {}

  @Mutation(() => Author)
  async createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ): Promise<Author> {
    return this.authorsService.create(createAuthorInput);
  }

  @Query(() => [Author])
  async authors(): Promise<Author[]> {
    return await this.authorsService.findAll();
  }

  @Query(() => Author)
  async author(@Args('id', { type: () => String }) id: string) {
    return await this.authorsService.findOne(id);
  }

  @ResolveField('posts', () => [Contents], {
    description: 'All the posts made by author',
  })
  async author_posts(@Parent() { id }: Author): Promise<Contents[]> {
    return await this.contentsService.findAuthorPosts(id);
  }

  @ResolveField('comments', () => [Contents], {
    description: 'All the comments made by author',
  })
  async author_comments(@Parent() { id }: Author): Promise<Contents[]> {
    return await this.contentsService.findAuthorComments(id);
  }

  @ResolveField('reactions', () => [Reaction], {
    description: 'All the reactions given by author',
  })
  async author_reactions(@Parent() { id }: Author): Promise<Reaction[]> {
    return await this.reactionServices.findReactionsByAuthor(id);
  }

  @Mutation(() => Author)
  async removeAuthor(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Author> {
    const authorThemself = await this.authorsService.findOne(id);
    const authorContents = await this.contentsService.findAuthorContents(id);

    if (!authorThemself) {
      throw new HttpException(
        'Forbidden Action: There is no user with this Id.',
        HttpStatus.FORBIDDEN,
      );
    }

    if (authorContents[0] == undefined) {
      return await this.authorsService.remove(id);
    } else {
      throw new HttpException(
        'Forbidden: Author still have posts or comments.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
