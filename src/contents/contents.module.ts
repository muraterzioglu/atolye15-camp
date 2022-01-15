import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsResolver } from './contents.resolver';

@Module({
  providers: [ContentsResolver, ContentsService],
})
export class ContentsModule {}
