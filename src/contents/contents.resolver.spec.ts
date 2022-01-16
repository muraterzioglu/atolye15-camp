import { Test, TestingModule } from '@nestjs/testing';
import { ContentsResolver } from './contents.resolver';
import { ContentsService } from './contents.service';

describe('ContentsResolver', () => {
  let resolver: ContentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentsResolver, ContentsService],
    }).compile();

    resolver = module.get<ContentsResolver>(ContentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
