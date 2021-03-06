import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Contents } from '../../contents/entities/content.entity';

@Entity('reactions')
@ObjectType()
export class Reaction {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Unique uuid of reaction' })
  id: string;

  @Column('uuid')
  @Field(() => Contents, { description: 'Content of the reaction' })
  content: string;

  @Column('uuid')
  @Field(() => Author, { description: 'Author of the reaction' })
  author: string;

  @Column('text')
  @Field(() => String, { description: 'Reaction for the content' })
  reaction: string;
}
