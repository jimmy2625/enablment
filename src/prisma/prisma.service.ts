import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  public client: PrismaClient;
    book: any;
    author: any;

  constructor() {
    this.client = new PrismaClient();
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}