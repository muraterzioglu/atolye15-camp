import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field(() => String, { description: 'Firstname of the author' })
  author_name: string;

  @Field(() => String, { description: 'Lastname of the author' })
  author_surname: string;

  @Field(() => String, {
    description: 'E-Mail address of the author, should be unique',
  })
  author_mail: string;
}
