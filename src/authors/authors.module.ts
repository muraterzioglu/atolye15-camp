import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Contents } from '../contents/entities/content.entity';
import { ContentsService } from '../contents/contents.service';
import { Reaction } from '../reactions/entities/reaction.entity';
import { ReactionsService } from '../reactions/reactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Contents, Reaction])],
  providers: [
    AuthorsResolver,
    AuthorsService,
    ContentsService,
    ReactionsService,
  ],
})
export class AuthorsModule {}
