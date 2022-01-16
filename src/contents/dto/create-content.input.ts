import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContentInput {
  @Field(() => String, { description: 'Type of the content, post or comment' })
  content_type: 'comment' | 'post';

  @Field(() => String, { description: 'Author of the content' })
  content_author: string;

  @Field(() => String, { description: 'Title of the content' })
  content_title: string;

  @Field(() => String, {
    description: 'Full context of the content',
    nullable: true,
  })
  content_relation: string;

  @Field(() => String, { description: 'Full context of the content' })
  content_context: string;
}
