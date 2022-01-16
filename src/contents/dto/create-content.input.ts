import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContentInput {
  @Field(() => String, { description: 'Type of the content, post or comment' })
  type: 'comment' | 'post';

  @Field(() => String, { description: 'Author of the content' })
  author: string;

  @Field(() => String, { description: 'Title of the content' })
  title: string;

  @Field(() => String, {
    description: 'Full context of the content',
    nullable: true,
  })
  relation: string;

  @Field(() => String, { description: 'Full context of the content' })
  context: string;
}
