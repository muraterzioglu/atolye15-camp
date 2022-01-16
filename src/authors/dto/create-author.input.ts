import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field(() => String, { description: 'Firstname of the author' })
  name: string;

  @Field(() => String, { description: 'Lastname of the author' })
  surname: string;

  @Field(() => String, {
    description: 'E-Mail address of the author, should be unique',
  })
  mail: string;

  @Field(() => String, {
    description: 'E-Mail address of the author, should be unique',
  })
  avatar: string;
}
