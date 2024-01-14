// book.resolver.ts

import { Resolver, Query, Mutation, Args, InputType, Field, Int } from '@nestjs/graphql';
import { BooksService } from '../books/books.service';
import { BookType } from './book.type';

@InputType()
class CreateBookInput {
  @Field()
  title: string;

  @Field(() => Int)
  authorId: number;

  @Field()
  description: string;

  @Field(() => Int)
  publishedYear: number;

  @Field(() => Int)
  stockCount: number;
}

@Resolver(() => BookType)
export class BookResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [BookType])
  async books() {
    return this.booksService.getAllBooks();
  }

  @Query(() => BookType)
  async book(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.getBookById(id);
  }

  @Mutation(() => BookType)
  async createBook(@Args('data') data: CreateBookInput) {
    return this.booksService.createBook(data);
  }

  @Mutation(() => BookType)
  async updateBook(@Args('id', { type: () => Int }) id: number, @Args('data') data: CreateBookInput) {
    return this.booksService.updateBook(id, data);
  }

  @Mutation(() => BookType)
  async deleteBook(@Args('id', { type: () => Int }) id: number) {
    return this.booksService.deleteBook(id);
  }
}
