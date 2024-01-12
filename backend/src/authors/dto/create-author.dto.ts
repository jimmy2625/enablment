// src/authors/dto/create-author.dto.ts
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly bio: string;
}
