// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BooksService } from './books/books.service';
import { AuthorsService } from './authors/authors.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [BooksService, AuthorsService, PrismaService],
})
export class AppModule {}
