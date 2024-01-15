import { Controller, Get, Param, Post, Body, Put, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { BooksService } from './books/books.service';
import { AuthorsService } from './authors/authors.service';
import { validateOrReject } from 'class-validator';

@Controller()
export class AppController {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
  ) {}

  // Books Endpoints

  @Get('/books')
  async getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Get('/books/:id')
  async getBookById(@Param('id') id: number) {
    return this.booksService.getBookById(id);
  }

  @Post('/books')
  async createBook(@Body() data: any) {
    try {
      await this.validateBookData(data);
      return this.booksService.createBook(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put('/books/:id')
  async updateBook(@Param('id') id: number, @Body() data: any) {
    try {
      await this.validateBookData(data);
      return this.booksService.updateBook(id, data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete('/books/:id')
  async deleteBook(@Param('id') id: number) {
    try {
      return this.booksService.deleteBook(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // Authors Endpoints

  @Get('/authors')
  async getAllAuthors() {
    return this.authorsService.getAllAuthors();
  }

  @Get('/authors/:id')
  async getAuthorById(@Param('id') id: number) {
    return this.authorsService.getAuthorById(id);
  }

  @Post('/authors')
  async createAuthor(@Body() data: any) {
    try {
      await this.validateAuthorData(data);
      return this.authorsService.createAuthor(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Put('/authors/:id')
  async updateAuthor(@Param('id') id: number, @Body() data: any) {
    try {
      await this.validateAuthorData(data);
      return this.authorsService.updateAuthor(id, data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Delete('/authors/:id')
  async deleteAuthor(@Param('id') id: number) {
    try {
      return this.authorsService.deleteAuthor(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  private async validateBookData(data: any) {
    try {
      await validateOrReject(data, { skipMissingProperties: true });
    } catch (errors) {
      throw errors;
    }
  }

  private async validateAuthorData(data: any) {
    try {
      await validateOrReject(data, { skipMissingProperties: true });
    } catch (errors) {
      throw errors;
    }
  }
}
