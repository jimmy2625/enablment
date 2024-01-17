import { AuthorsService } from '../authors/authors.service';
import { CreateAuthorDto } from '../authors/dto/create-author.dto';
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
    createAuthor(data: CreateAuthorDto): Promise<{
        id: number;
        name: string;
        bio: string;
    }>;
    updateAuthor(id: number, data: CreateAuthorDto): Promise<{
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
