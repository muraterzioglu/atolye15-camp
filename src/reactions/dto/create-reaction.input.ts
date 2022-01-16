import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateReactionInput {
  @Field(() => String, { description: 'Content of the reaction' })
  content: string;

  @Field(() => String, { description: 'Author of the reaction' })
  author: string;

  @Field(() => String, { description: 'Reaction for the content' })
  reaction: string;
}
