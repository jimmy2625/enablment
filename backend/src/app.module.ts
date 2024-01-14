import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorResolver } from './graphql/author.resolver';
import { BookResolver } from './graphql/book.resolver';
import { ApolloDriver } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { BooksService } from './books/books.service';
import { AuthorsService } from './authors/authors.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: './schema.gql',
      sortSchema: true,
      playground: true,
    })
  ],
  controllers: [AppController],
  providers: [BookResolver, AuthorResolver, BooksService, AuthorsService, PrismaService],
})
export class AppModule {}
