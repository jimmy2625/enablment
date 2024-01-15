import { BookType } from './book.type';
export declare class AuthorType {
    id: number;
    name: string;
    bio: string;
    books?: BookType[];
}
