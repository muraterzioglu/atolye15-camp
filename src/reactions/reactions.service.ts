import { Injectable } from '@nestjs/common';
import { CreateReactionInput } from './dto/create-reaction.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private readonly reactionsRepo: Repository<Reaction>,
  ) {}

  async create(createReactionInput: CreateReactionInput): Promise<Reaction> {
    const reaction = this.reactionsRepo.create(createReactionInput);
    return await this.reactionsRepo.save(reaction);
  }

  async findAll(): Promise<Reaction[]> {
    return await this.reactionsRepo.find();
  }

  async findOne(id_reaction: string): Promise<Reaction> {
    return await this.reactionsRepo.findOne(id_reaction);
  }

  async remove(id_reaction: string): Promise<Reaction> {
    const reaction = this.reactionsRepo.findOne(id_reaction);
    await this.reactionsRepo.delete(id_reaction);
    return reaction;
  }
}
