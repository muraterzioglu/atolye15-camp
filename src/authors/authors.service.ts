import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { Contents } from '../contents/entities/content.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,

    @InjectRepository(Contents)
    private readonly contentsRepository: Repository<Contents>,
  ) {}

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const newAuthor = this.authorRepository.create(createAuthorInput);
    return await this.authorRepository.save(newAuthor);
  }

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async findOne(id: string): Promise<Author> {
    return await this.authorRepository.findOne(id);
  }

  async remove(content_author: string): Promise<DeleteResult> {
    const contents = await this.contentsRepository.find({ content_author });

    if (contents[0] == undefined) {
      return await this.authorRepository.delete(content_author);
    } else {
      throw new HttpException(
        'Forbidden: Author still have posts or comments.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
