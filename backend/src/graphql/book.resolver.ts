import { Resolver, Query, Mutation, Args, InputType, Field, Int } from '@nestjs/graphql';
import { BooksService } from '../books/books.service';
import { BookType } from './book.type';
import { NotFoundException, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { CreateBookDto } from '../books/dto/create-book.dto';

@Resolver(() => BookType)
export class BookResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [BookType])
  async books() {
    return this.booksService.getAllBooks();
  }

  @Query(() => BookType)
  async book(@Args('id', { type: () => Int }) id: number) {
    const book = await this.booksService.getBookById(id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  @Mutation(() => BookType)
  @UsePipes(new ValidationPipe())
  async createBook(@Args('data') data: CreateBookDto) {
    try {
      await this.validateBookData(data);
      return this.booksService.createBook(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => BookType)
  @UsePipes(new ValidationPipe())
  async updateBook(@Args('id', { type: () => Int }) id: number, @Args('data') data: CreateBookDto) {
    try {
      await this.validateBookData(data);

      const existingBook = await this.booksService.getBookById(id);
      if (!existingBook) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      return this.booksService.updateBook(id, data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => BookType)
  async deleteBook(@Args('id', { type: () => Int }) id: number) {
    try {
      const existingBook = await this.booksService.getBookById(id);
      if (!existingBook) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      return this.booksService.deleteBook(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async validateBookData(data: CreateBookDto) {
    try {
      await validateOrReject(Object.assign(new CreateBookDto(), data), { skipMissingProperties: true });
    } catch (errors) {
      throw errors;
    }
  }
}
