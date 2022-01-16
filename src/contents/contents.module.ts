import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsResolver } from './contents.resolver';
import { Contents } from './entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from '../authors/authors.service';
import { Author } from '../authors/entities/author.entity';
import { Reaction } from '../reactions/entities/reaction.entity';
import { ReactionsService } from '../reactions/reactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contents, Author, Reaction])],
  providers: [
    ContentsResolver,
    ContentsService,
    AuthorsService,
    ReactionsService,
  ],
})
export class ContentsModule {}
