import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Field()
  @IsOptional()
  @IsString()
  readonly bio: string;
}
