import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';

@Entity('contents')
@ObjectType()
export class Contents {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Unique uuid of content' })
  id: string;

  @Column('text')
  @Field(() => String, { description: 'Type of the content, post or comment' })
  type: 'comment' | 'post';

  @Column('uuid')
  @Field(() => Author, { description: 'Author of the content' })
  author: string;

  @Column('uuid')
  @Field(() => String, {
    nullable: true,
    description: "If it's a comment, define post here",
  })
  relation: string;

  @Column('text')
  @Field(() => String, { description: 'Title of the content' })
  title: string;

  @Column('text')
  @Field(() => String, { description: 'Full context of the content' })
  context: string;
}
