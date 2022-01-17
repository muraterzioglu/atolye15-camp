import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('author')
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Unique uuid of author' })
  id: string;

  @Column('text')
  @Field(() => String, { description: 'Firstname of the author' })
  name: string;

  @Column('text')
  @Field(() => String, { description: 'Lastname of the author' })
  surname: string;

  @Column('text', { unique: true }) // One user per mail
  @Field(() => String, { description: 'E-Mail address of the author' })
  mail: string;
}
