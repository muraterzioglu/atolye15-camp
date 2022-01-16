import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ReactionsService } from './reactions.service';
import { Reaction } from './entities/reaction.entity';
import { CreateReactionInput } from './dto/create-reaction.input';
import { Author } from '../authors/entities/author.entity';
import { AuthorsService } from '../authors/authors.service';
import { ContentsService } from '../contents/contents.service';
import { Contents } from '../contents/entities/content.entity';

@Resolver(() => Reaction)
export class ReactionsResolver {
  constructor(
    private readonly reactionsService: ReactionsService,
    private readonly authorsService: AuthorsService,
    private readonly contentsService: ContentsService,
  ) {}

  @Mutation(() => Reaction)
  async createReaction(
    @Args('createReactionInput') createReactionInput: CreateReactionInput,
  ): Promise<Reaction> {
    return await this.reactionsService.create(createReactionInput);
  }

  @Query(() => [Reaction], { name: 'reactions' })
  async findAll() {
    return await this.reactionsService.findAll();
  }

  @Query(() => Reaction, { name: 'reaction' })
  async findOne(
    @Args('id_reaction', { type: () => String }) id_reaction: string,
  ) {
    return await this.reactionsService.findOne(id_reaction);
  }

  @ResolveField('id_author', () => Author)
  async id_author(@Parent() { id_author }: Reaction): Promise<Author> {
    return await this.authorsService.findOne(id_author);
  }

  @ResolveField('id_content', () => Contents)
  async id_content(@Parent() { id_content }: Reaction): Promise<Contents> {
    return await this.contentsService.findOne(id_content);
  }

  @Mutation(() => Reaction)
  removeReaction(
    @Args('id_reaction', { type: () => String }) id_reaction: string,
  ) {
    return this.reactionsService.remove(id_reaction);
  }
}
