import { Resolver, Query, Mutation, Args, InputType, Field, Int } from '@nestjs/graphql';
import { AuthorsService } from '../authors/authors.service';
import { AuthorType } from './author.type';
import { NotFoundException, BadRequestException, UsePipes, ValidationPipe } from '@nestjs/common';
import { validateOrReject } from 'class-validator';

@InputType()
class CreateAuthorInput {
  @Field()
  name: string;

  @Field()
  bio: string;
}

@Resolver(() => AuthorType)
export class AuthorResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Query(() => [AuthorType])
  async authors() {
    return this.authorsService.getAllAuthors();
  }

  @Query(() => AuthorType)
  async author(@Args('id', { type: () => Int }) id: number) {
    const author = await this.authorsService.getAuthorById(id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  @Mutation(() => AuthorType)
  @UsePipes(new ValidationPipe())
  async createAuthor(@Args('data') data: CreateAuthorInput) {
    try {
      await this.validateAuthorData(data);
      return this.authorsService.createAuthor(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => AuthorType)
  @UsePipes(new ValidationPipe())
  async updateAuthor(@Args('id', { type: () => Int }) id: number, @Args('data') data: CreateAuthorInput) {
    try {
      await this.validateAuthorData(data);

      const existingAuthor = await this.authorsService.getAuthorById(id);
      if (!existingAuthor) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }

      return this.authorsService.updateAuthor(id, data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => AuthorType)
  async deleteAuthor(@Args('id', { type: () => Int }) id: number) {
    try {
      const existingAuthor = await this.authorsService.getAuthorById(id);
      if (!existingAuthor) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }

      return this.authorsService.deleteAuthor(id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  private async validateAuthorData(data: any) {
    try {
      await validateOrReject(data, { skipMissingProperties: true });
    } catch (errors) {
      throw errors;
    }
  }
}
