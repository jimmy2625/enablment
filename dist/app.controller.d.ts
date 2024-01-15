import { BooksService } from './books/books.service';
import { AuthorsService } from './authors/authors.service';
export declare class AppController {
    private readonly booksService;
    private readonly authorsService;
    constructor(booksService: BooksService, authorsService: AuthorsService);
    getAllBooks(): Promise<any>;
    getBookById(id: number): Promise<any>;
    createBook(data: any): Promise<any>;
    updateBook(id: number, data: any): Promise<any>;
    deleteBook(id: number): Promise<any>;
    getAllAuthors(): Promise<any>;
    getAuthorById(id: number): Promise<any>;
    createAuthor(data: any): Promise<any>;
    updateAuthor(id: number, data: any): Promise<any>;
    deleteAuthor(id: number): Promise<any>;
    private handleServiceCall;
}
