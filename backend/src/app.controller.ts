import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { BooksService } from './books/books.service';
import { AuthorsService } from './authors/authors.service';

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
    return this.booksService.createBook(data);
  }

  @Put('/books/:id')
  async updateBook(@Param('id') id: number, @Body() data: any) {
    return this.booksService.updateBook(id, data);
  }

  @Delete('/books/:id')
  async deleteBook(@Param('id') id: number) {
    return this.booksService.deleteBook(id);
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
    return this.authorsService.createAuthor(data);
  }

  @Put('/authors/:id')
  async updateAuthor(@Param('id') id: number, @Body() data: any) {
    return this.authorsService.updateAuthor(id, data);
  }

  @Delete('/authors/:id')
  async deleteAuthor(@Param('id') id: number) {
    return this.authorsService.deleteAuthor(id);
  }
}