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

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly contentsService: ContentsService,
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

  @ResolveField('author_posts', () => [Contents], {
    description: 'All the posts made by author',
  })
  async author_posts(@Parent() author: Author): Promise<Contents[]> {
    const { author_id } = await author;
    return await this.contentsService.findAuthorPosts(author_id);
  }

  @ResolveField('author_comments', () => [Contents], {
    description: 'All the comments made by author',
  })
  async author_comments(@Parent() author: Author): Promise<Contents[]> {
    const { author_id } = await author;
    return await this.contentsService.findAuthorComments(author_id);
  }

  @Mutation(() => Author)
  async removeAuthor(
    @Args('author_id', { type: () => String }) author_id: string,
  ): Promise<Author> {
    const authorThemself = await this.authorsService.findOne(author_id);
    const authorContents = await this.contentsService.findAuthorContents(
      author_id,
    );

    if (!authorThemself) {
      throw new HttpException(
        'Forbidden Action: There is no user with this Id.',
        HttpStatus.FORBIDDEN,
      );
    }

    if (authorContents[0] == undefined) {
      return await this.authorsService.remove(author_id);
    } else {
      throw new HttpException(
        'Forbidden: Author still have posts or comments.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
