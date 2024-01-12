// src/books/dto/create-book.dto.ts
export class CreateBookDto {
    title: string;
    authorId: number;
    description: string;
    publishedYear: number;
    stockCount: number;
  }
  
  // src/books/dto/update-book.dto.ts
  export class UpdateBookDto {
    title?: string;
    authorId?: number;
    description?: string;
    publishedYear?: number;
    stockCount?: number;
  }
  
  // src/authors/dto/create-author.dto.ts
  export class CreateAuthorDto {
    name: string;
    bio: string;
  }
  
  // src/authors/dto/update-author.dto.ts
  export class UpdateAuthorDto {
    name?: string;
    bio?: string;
  }  