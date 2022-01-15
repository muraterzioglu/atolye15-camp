import { Injectable } from '@nestjs/common';
import { CreateContentInput } from './dto/create-content.input';
import { UpdateContentInput } from './dto/update-content.input';

@Injectable()
export class ContentsService {
  create(createContentInput: CreateContentInput) {
    return 'This action adds a new content';
  }

  findAll() {
    return `This action returns all contents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} content`;
  }

  update(id: number, updateContentInput: UpdateContentInput) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
