// author.resolver.ts

import { Resolver, Query, Mutation, Args, InputType, Field, Int } from '@nestjs/graphql';
import { AuthorsService } from '../authors/authors.service';
import { AuthorType } from './author.type';

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
    return this.authorsService.getAuthorById(id);
  }

  @Mutation(() => AuthorType)
  async createAuthor(@Args('data') data: CreateAuthorInput) {
    return this.authorsService.createAuthor(data);
  }

  @Mutation(() => AuthorType)
  async updateAuthor(@Args('id', { type: () => Int }) id: number, @Args('data') data: CreateAuthorInput) {
    return this.authorsService.updateAuthor(id, data);
  }

  @Mutation(() => AuthorType)
  async deleteAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.deleteAuthor(id);
  }
}
