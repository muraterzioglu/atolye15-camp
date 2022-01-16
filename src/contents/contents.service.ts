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
      createContentInput.content_type === 'post' &&
      createContentInput.content_relation !== null
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

  async findAll(content_type: 'comment' | 'post' | 'all'): Promise<Contents[]> {
    if (content_type === 'all') return await this.contentsRepo.find();
    else return await this.contentsRepo.find({ content_type });
  }

  async findOne(content_id: string): Promise<Contents> {
    return await this.contentsRepo.findOne(content_id);
  }

  async findAuthorPosts(content_author: string): Promise<Contents[]> {
    return await this.contentsRepo.find({
      content_author: content_author,
      content_type: 'post',
    });
  }

  async findPostComments(content_id: string): Promise<Contents[]> {
    return await this.contentsRepo.find({
      content_relation: content_id,
      content_type: 'comment',
    });
  }

  async findAuthorComments(content_author: string): Promise<Contents[]> {
    return await this.contentsRepo.find({
      content_author: content_author,
      content_type: 'comment',
    });
  }

  async findAuthorContents(content_author: string): Promise<Contents[]> {
    return await this.contentsRepo.find({ content_author });
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.contentsRepo.delete(id);
  }
}
