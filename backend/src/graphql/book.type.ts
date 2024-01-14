// book.type.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class BookType {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field(() => ID)
  authorId: number;

  @Field()
  description: string;

  @Field()
  publishedYear: number;

  @Field()
  stockCount: number;
}
