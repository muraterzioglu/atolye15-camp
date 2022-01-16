import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsResolver } from './contents.resolver';
import { Contents } from './entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from '../authors/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contents, Author])],
  providers: [ContentsResolver, ContentsService],
})
export class ContentsModule {}
