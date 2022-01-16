import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateContentInput } from './dto/create-content.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Contents } from './entities/content.entity';
import { DeleteResult, Repository } from 'typeorm';
import { Author } from '../authors/entities/author.entity';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Contents)
    private readonly contentsRepository: Repository<Contents>,

    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
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
      const contents = this.contentsRepository.create(createContentInput);
      return await this.contentsRepository.save(contents);
    }
  }

  async findAll(content_type: 'comment' | 'post' | 'all'): Promise<Contents[]> {
    if (content_type === 'all') return await this.contentsRepository.find();
    else return await this.contentsRepository.find({ content_type });
  }

  async findOne(content_id: string): Promise<Contents> {
    return await this.contentsRepository.findOne(content_id);
  }

  async findAuthorPosts(content_author: string): Promise<Contents[]> {
    return await this.contentsRepository.find({
      content_author: content_author,
      content_type: 'post',
    });
  }

  async findAuthorComments(content_author: string): Promise<Contents[]> {
    return await this.contentsRepository.find({
      content_author: content_author,
      content_type: 'comment',
    });
  }

  async postAuthor(author_id: string): Promise<Author> {
    return await this.authorRepository.findOne({ author_id });
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.contentsRepository.delete(id);
  }
}
