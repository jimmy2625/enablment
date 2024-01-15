// books.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBooks() {
    return this.prismaService.client.book.findMany();
  }

  async getBookById(id: number) {
    return this.prismaService.client.book.findUnique({
      where: { id },
    });
  }

  async createBook(data: any) {
    return this.prismaService.client.book.create({ data });
  }

  async updateBook(id: number, data: any) {
    return this.prismaService.client.book.update({
      where: { id },
      data,
    });
  }

  async deleteBook(id: number) {
    return this.prismaService.client.book.delete({
      where: { id },
    });
  }
}