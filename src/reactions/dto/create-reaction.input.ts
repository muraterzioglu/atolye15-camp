import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateReactionInput {
  @Field(() => String, { description: 'Content of the reaction' })
  id_content: string;

  @Field(() => String, { description: 'Author of the reaction' })
  id_author: string;

  @Field(() => String, { description: 'Reaction for the content' })
  reaction: string;
}
