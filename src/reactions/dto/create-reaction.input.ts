import { InputType, Field } from '@nestjs/graphql';
import { Contents } from '../../contents/entities/content.entity';
import { Author } from '../../authors/entities/author.entity';

@InputType()
export class CreateReactionInput {
  @Field(() => Contents, { description: 'Content of the reaction' })
  id_content: string;

  @Field(() => Author, { description: 'Author of the reaction' })
  id_author: string;

  @Field(() => String, { description: 'Reaction for the content' })
  reaction: string;
}
