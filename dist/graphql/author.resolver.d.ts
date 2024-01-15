import { AuthorsService } from '../authors/authors.service';
declare class CreateAuthorInput {
    name: string;
    bio: string;
}
export declare class AuthorResolver {
    private readonly authorsService;
    constructor(authorsService: AuthorsService);
    authors(): Promise<{
        id: number;
        name: string;
        bio: string;
    }[]>;
    author(id: number): Promise<{
        id: number;
        name: string;
        bio: string;
    }>;
    createAuthor(data: CreateAuthorInput): Promise<{
        id: number;
        name: string;
        bio: string;
    }>;
    updateAuthor(id: number, data: CreateAuthorInput): Promise<{
        id: number;
        name: string;
        bio: string;
    }>;
    deleteAuthor(id: number): Promise<{
        id: number;
        name: string;
        bio: string;
    }>;
    private validateAuthorData;
}
export {};
