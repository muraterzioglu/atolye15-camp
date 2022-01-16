import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsResolver } from './reactions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';
import { Author } from '../authors/entities/author.entity';
import { Contents } from '../contents/entities/content.entity';
import { ContentsService } from '../contents/contents.service';
import { AuthorsService } from '../authors/authors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction, Author, Contents])],
  providers: [
    ReactionsResolver,
    ReactionsService,
    ContentsService,
    AuthorsService,
  ],
})
export class ReactionsModule {}
