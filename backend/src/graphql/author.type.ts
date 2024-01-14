import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BookType } from './book.type'; // Import the BookType

@ObjectType()
export class AuthorType {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  bio: string;

  @Field(() => [BookType], { nullable: true }) // Define the books field as an array of BookType
  books?: BookType[]; // Add the books field to AuthorType
}
