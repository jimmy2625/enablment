// authors.service.ts

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllAuthors() {
    return this.prismaService.client.author.findMany({     
    });
  }

  async getAuthorById(id: number) {
    const author = await this.prismaService.client.author.findUnique({
      where: { id },
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return author;
  }

  async createAuthor(data: any) {
    try {
      return await this.prismaService.client.author.create({ data });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create author');
    }
  }

  async updateAuthor(id: number, data: any) {
    try {
      const existingAuthor = await this.prismaService.client.author.findUnique({
        where: { id },
      });

      if (!existingAuthor) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }

      return await this.prismaService.client.author.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to update author');
    }
  }

  async deleteAuthor(id: number) {
    const existingAuthor = await this.prismaService.client.author.findUnique({
      where: { id },
    });

    if (!existingAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return await this.prismaService.client.author.delete({
      where: { id },
    });
  }


  async getBooksByAuthorId(authorId: number) {
    return this.prismaService.client.book.findMany({
      where: {
        authorId: authorId,
      },
    });
  }
}