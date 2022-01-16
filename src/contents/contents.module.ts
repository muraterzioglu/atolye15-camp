import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsResolver } from './contents.resolver';
import { Contents } from './entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from '../authors/authors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Contents])],
  providers: [ContentsResolver, ContentsService, AuthorsService],
})
export class ContentsModule {}
