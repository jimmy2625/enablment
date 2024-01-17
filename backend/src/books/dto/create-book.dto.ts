import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateBookDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly authorId: number;

  @Field()
  @IsOptional()
  @IsString()
  readonly description?: string;

  @Field()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly publishedYear?: number;

  @Field()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly stockCount?: number;
}