import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
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
    return this.handleServiceCall(() => this.booksService.getAllBooks());
  }

  @Get('/books/:id')
  async getBookById(@Param('id') id: number) {
    return this.handleServiceCall(() => this.booksService.getBookById(id));
  }

  @Post('/books')
  async createBook(@Body() data: any) {
    return this.handleServiceCall(() => this.booksService.createBook(data), HttpStatus.CREATED);
  }

  @Put('/books/:id')
  async updateBook(@Param('id') id: number, @Body() data: any) {
    return this.handleServiceCall(() => this.booksService.updateBook(id, data));
  }

  @Delete('/books/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBook(@Param('id') id: number) {
    return this.handleServiceCall(() => this.booksService.deleteBook(id));
  }

  // Authors Endpoints

  @Get('/authors')
  async getAllAuthors() {
    return this.handleServiceCall(() => this.authorsService.getAllAuthors());
  }

  @Get('/authors/:id')
  async getAuthorById(@Param('id') id: number) {
    return this.handleServiceCall(() => this.authorsService.getAuthorById(id));
  }

  @Post('/authors')
  async createAuthor(@Body() data: any) {
    return this.handleServiceCall(() => this.authorsService.createAuthor(data), HttpStatus.CREATED);
  }

  @Put('/authors/:id')
  async updateAuthor(@Param('id') id: number, @Body() data: any) {
    return this.handleServiceCall(() => this.authorsService.updateAuthor(id, data));
  }

  @Delete('/authors/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAuthor(@Param('id') id: number) {
    return this.handleServiceCall(() => this.authorsService.deleteAuthor(id));
  }

  private async handleServiceCall(serviceCall: () => Promise<any>, successStatus = HttpStatus.OK) {
    try {
      return await serviceCall();
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to process request');
    }
  }
}
