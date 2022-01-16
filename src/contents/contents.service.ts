import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContentInput } from './dto/create-content.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from './entities/content.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Contents)
    private readonly contentsRepo: Repository<Contents>,
  ) {}

  async create(createContentInput: CreateContentInput): Promise<Contents> {
    // Post's can't have a relation with other posts, just comments.
    if (
      createContentInput.type === 'post' &&
      createContentInput.relation !== null
    ) {
      throw new HttpException(
        "Forbidden: Post's can't have a relation with other posts, just comments.",
        HttpStatus.FORBIDDEN,
      );
    } else {
      const contents = this.contentsRepo.create(createContentInput);
      return await this.contentsRepo.save(contents);
    }
  }

  async findAll(type: 'comment' | 'post' | 'all'): Promise<Contents[]> {
    if (type === 'all') return await this.contentsRepo.find();
    else return await this.contentsRepo.find({ type });
  }

  async findOne(id: string): Promise<Contents> {
    return await this.contentsRepo.findOne(id);
  }

  async findAuthorPosts(author: string): Promise<Contents[]> {
    return await this.contentsRepo.find({ author, type: 'post' });
  }

  async findPostComments(content_id: string): Promise<Contents[]> {
    return await this.contentsRepo.find({
      relation: content_id,
      type: 'comment',
    });
  }

  async findAuthorComments(author: string): Promise<Contents[]> {
    return await this.contentsRepo.find({ type: 'comment', author });
  }

  async findAuthorContents(author: string): Promise<Contents[]> {
    return await this.contentsRepo.find({ author });
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.contentsRepo.delete(id);
  }
}
