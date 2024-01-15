import { BooksService } from '../books/books.service';
declare class CreateBookInput {
    title: string;
    authorId: number;
    description: string;
    publishedYear: number;
    stockCount: number;
}
export declare class BookResolver {
    private readonly booksService;
    constructor(booksService: BooksService);
    books(): Promise<{
        id: number;
        title: string;
        authorId: number;
        description: string;
        publishedYear: number;
        stockCount: number;
    }[]>;
    book(id: number): Promise<{
        id: number;
        title: string;
        authorId: number;
        description: string;
        publishedYear: number;
        stockCount: number;
    }>;
    createBook(data: CreateBookInput): Promise<{
        id: number;
        title: string;
        authorId: number;
        description: string;
        publishedYear: number;
        stockCount: number;
    }>;
    updateBook(id: number, data: CreateBookInput): Promise<{
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
export {};
