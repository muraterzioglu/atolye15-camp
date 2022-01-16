import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsResolver } from './authors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Contents } from '../contents/entities/content.entity';
import { ContentsService } from '../contents/contents.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Contents])],
  providers: [AuthorsResolver, AuthorsService, ContentsService],
})
export class AuthorsModule {}
