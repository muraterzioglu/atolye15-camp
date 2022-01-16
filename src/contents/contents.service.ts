import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContentInput } from './dto/create-content.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from './entities/content.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Contents)
    private readonly contentsRepository: Repository<Contents>,
  ) {}

  /*
    TODO: Posts also returns their reactions, authors and comments
      -> Authors, Comments, Reactions by line
  */

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
      const contents = this.contentsRepository.create(createContentInput);
      return await this.contentsRepository.save(contents);
    }
  }

  async findAll(content_type: 'comment' | 'post'): Promise<Contents[]> {
    return await this.contentsRepository.find({ content_type });
  }

  async findOne(content_id: string): Promise<Contents> {
    return await this.contentsRepository.findOne(content_id);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.contentsRepository.delete(id);
  }
}
