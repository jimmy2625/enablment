// books.service.ts

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

  async createBook(data: any) {
    try {
      return await this.prismaService.client.book.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create book');
    }
  }

  async updateBook(id: number, data: any) {
    try {
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
}
