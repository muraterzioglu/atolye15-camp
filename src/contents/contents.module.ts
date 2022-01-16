import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsResolver } from './contents.resolver';
import { Contents } from './entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Contents])],
  providers: [ContentsResolver, ContentsService],
})
export class ContentsModule {}
