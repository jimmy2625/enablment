import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { validateOrReject } from 'class-validator';

@Injectable()
export class AuthorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllAuthors() {
    return this.prismaService.client.author.findMany();
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
      await this.validateAuthorData(data);
      return this.prismaService.client.author.create({ data });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateAuthor(id: number, data: any) {
    try {
      await this.validateAuthorData(data);

      const existingAuthor = await this.prismaService.client.author.findUnique({
        where: { id },
      });

      if (!existingAuthor) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }

      return this.prismaService.client.author.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteAuthor(id: number) {
    const existingAuthor = await this.prismaService.client.author.findUnique({
      where: { id },
    });

    if (!existingAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    return this.prismaService.client.author.delete({
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

  private async validateAuthorData(data: any) {
    try {
      await validateOrReject(data, { skipMissingProperties: true });
    } catch (errors) {
      throw errors;
    }
  }
}
