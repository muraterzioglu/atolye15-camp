import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Unique uuid of author' })
  author_id: string;

  @Column('text')
  @Field(() => String, { description: 'Firstname of the author' })
  author_name: string;

  @Column('text')
  @Field(() => String, { description: 'Lastname of the author' })
  author_surname: string;

  @Column('text', { unique: true }) // One user per mail
  @Field(() => String, { description: 'E-Mail address of the author' })
  author_mail: string;
}
