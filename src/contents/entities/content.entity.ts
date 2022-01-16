import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Contents {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Unique uuid of content' })
  content_id: string;

  @Column('text')
  @Field(() => String, { description: 'Type of the content, post or comment' })
  content_type: 'comment' | 'post';

  @Column('uuid')
  @Field(() => String, { description: 'Author of the content' })
  content_author: string;

  @Column('uuid')
  @Field(() => String, {
    nullable: true,
    description: "If it's a comment, define post here",
  })
  content_relation: string;

  @Column('text')
  @Field(() => String, { description: 'Title of the content' })
  content_title: string;

  @Column('text')
  @Field(() => String, { description: 'Full context of the content' })
  content_context: string;
}
