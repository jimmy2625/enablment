// author.type.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AuthorType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  bio: string;
}
