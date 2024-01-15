import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
export declare class BooksService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllBooks(): Promise<{
        id: number;
        title: string;
        authorId: number;
        description: string;
        publishedYear: number;
        stockCount: number;
    }[]>;
    getBookById(id: number): Promise<{
        id: number;
        title: string;
        authorId: number;
        description: string;
        publishedYear: number;
        stockCount: number;
    }>;
    createBook(data: CreateBookDto): Promise<{
        id: number;
        title: string;
        authorId: number;
        description: string;
        publishedYear: number;
        stockCount: number;
    }>;
    updateBook(id: number, data: CreateBookDto): Promise<{
        id: number;
        title: string;
        authorId: number;
        description: string;
        publishedYear: number;
        stockCount: number;
    }>;
    deleteBook(id: number): Promise<{
        id: number;
        title: string;
        authorId: number;
        description: string;
        publishedYear: number;
        stockCount: number;
    }>;
    private validateBookData;
}
