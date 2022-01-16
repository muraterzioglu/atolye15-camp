import { Injectable } from '@nestjs/common';
import { CreateAuthorInput } from './dto/create-author.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
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

  async remove(content_author: string): Promise<Author> {
    const author = this.authorRepository.findOne(content_author);
    // For proper response we save user before delete

    await this.authorRepository.delete(content_author);
    return author;
  }
}
