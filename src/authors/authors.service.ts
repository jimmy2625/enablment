import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Update the path based on your project structure

@Injectable()
export class AuthorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllAuthors() {
    try {
      const authors = await this.prismaService.client.author.findMany({
        include: { books: true }, // Include associated books if needed
      });
      return authors;
    } catch (error) {
      // Handle errors, log, or throw a custom exception
      console.error('Error in getAllAuthors:', error);
      throw new Error('Unable to fetch authors.');
    }
  }

  async getAuthorById(id: number) {
    try {
      const author = await this.prismaService.client.author.findUnique({
        where: { id },
        include: { books: true }, // Include associated books if needed
      });
      return author;
    } catch (error) {
      // Handle errors, log, or throw a custom exception
      console.error('Error in getAuthorById:', error);
      throw new Error('Unable to fetch author by ID.');
    }
  }

  async createAuthor(data: any) {
    try {
      const author = await this.prismaService.client.author.create({ data });
      return author;
    } catch (error) {
      // Handle errors, log, or throw a custom exception
      console.error('Error in createAuthor:', error);
      throw new Error('Unable to create author.');
    }
  }

  async updateAuthor(id: number, data: any) {
    try {
      const updatedAuthor = await this.prismaService.client.author.update({
        where: { id },
        data,
      });
      return updatedAuthor;
    } catch (error) {
      // Handle errors, log, or throw a custom exception
      console.error('Error in updateAuthor:', error);
      throw new Error('Unable to update author.');
    }
  }

  async deleteAuthor(id: number) {
    try {
      const deletedAuthor = await this.prismaService.client.author.delete({
        where: { id },
      });
      return deletedAuthor;
    } catch (error) {
      // Handle errors, log, or throw a custom exception
      console.error('Error in deleteAuthor:', error);
      throw new Error('Unable to delete author.');
    }
  }
}
