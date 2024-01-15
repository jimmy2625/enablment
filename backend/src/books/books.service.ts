import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { validateOrReject } from 'class-validator';

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
      await this.validateBookData(data);
      return this.prismaService.client.book.create({ data });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateBook(id: number, data: any) {
    try {
      await this.validateBookData(data);

      const existingBook = await this.prismaService.client.book.findUnique({
        where: { id },
      });

      if (!existingBook) {
        throw new NotFoundException(`Book with ID ${id} not found`);
      }

      return this.prismaService.client.book.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteBook(id: number) {
    const existingBook = await this.prismaService.client.book.findUnique({
      where: { id },
    });

    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.prismaService.client.book.delete({
      where: { id },
    });
  }

  private async validateBookData(data: any) {
    try {
      await validateOrReject(data, { skipMissingProperties: true });
    } catch (errors) {
      throw errors;
    }
  }
}
