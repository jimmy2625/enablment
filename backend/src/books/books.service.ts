import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Update the path based on your project structure

@Injectable()
export class BooksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBooks() {
    try {
      const books = await this.prismaService.client.book.findMany();
      return books;
    } catch (error) {
      // Handle errors, log, or throw a custom exception
      console.error('Error in getAllBooks:', error);
      throw new Error('Unable to fetch books.');
    }
  }

  async getBookById(id: number) {
    try {
      const book = await this.prismaService.client.book.findUnique({
        where: { id },
      });
      return book;
    } catch (error) {
      // Handle errors, log, or throw a custom exception
      console.error('Error in getBookById:', error);
      throw new Error('Unable to fetch book by ID.');
    }
  }

  async createBook(data: any) {
    try {
      const book = await this.prismaService.client.book.create({ data });
      return book;
    } catch (error) {
      // Handle errors, log, or throw a custom exception
      console.error('Error in createBook:', error);
      throw new Error('Unable to create book.');
    }
  }

  async updateBook(id: number, data: any) {
    try {
      const updatedBook = await this.prismaService.client.book.update({
        where: { id },
        data,
      });
      return updatedBook;
    } catch (error) {
      // Handle errors, log, or throw a custom exception
      console.error('Error in updateBook:', error);
      throw new Error('Unable to update book.');
    }
  }

  async deleteBook(id: number) {
    try {
      const deletedBook = await this.prismaService.client.book.delete({
        where: { id },
      });
      return deletedBook;
    } catch (error) {
      // Handle errors, log, or throw a custom exception
      console.error('Error in deleteBook:', error);
      throw new Error('Unable to delete book.');
    }
  }
}
