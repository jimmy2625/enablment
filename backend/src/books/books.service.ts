// books.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { validate } from 'class-validator';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBooks() {
    return this.prismaService.client.book.findMany();
  }

  async getBookById(id: number) {
    const book = await this.prismaService.client.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async createBook(data: CreateBookDto) {
    try {
      const prismaData = {
        author: { connect: { id: data.authorId } },
        title: data.title,
        description: data.description,
        publishedYear: data.publishedYear,
        stockCount: data.stockCount,
      };
  
      return await this.prismaService.client.book.create({ data: prismaData });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create book');
    }
  }
  

  async updateBook(id: number, data: CreateBookDto) {
    try {
      await this.validateBookData(data);

      const existingBook = await this.prismaService.client.book.findUnique({
        where: { id },
      });

      if (!existingBook) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      return await this.prismaService.client.book.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update book');
    }
  }

  async deleteBook(id: number) {
    const existingBook = await this.prismaService.client.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return await this.prismaService.client.book.delete({
      where: { id },
    });
  }

  private async validateBookData(data: CreateBookDto) {
    const errors = await validate(data);

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
  }
}
