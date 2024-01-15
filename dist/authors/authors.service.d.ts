import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDto } from './dto/create-author.dto';
export declare class AuthorsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllAuthors(): Promise<{
        id: number;
        name: string;
        bio: string;
    }[]>;
    getAuthorById(id: number): Promise<{
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
    getBooksByAuthorId(authorId: number): Promise<{
        id: number;
        title: string;
        authorId: number;
        description: string;
        publishedYear: number;
        stockCount: number;
    }[]>;
    private validateAuthorData;
}
