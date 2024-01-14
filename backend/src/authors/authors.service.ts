// authors.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthorsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllAuthors() {
    return this.prismaService.client.author.findMany();
  }

  async getAuthorById(id: number) {
    return this.prismaService.client.author.findUnique({
      where: { id },
    });
  }

  async createAuthor(data: any) {
    return this.prismaService.client.author.create({ data });
  }

  async updateAuthor(id: number, data: any) {
    return this.prismaService.client.author.update({
      where: { id },
      data,
    });
  }

  async deleteAuthor(id: number) {
    return this.prismaService.client.author.delete({
      where: { id },
    });
  }
}
