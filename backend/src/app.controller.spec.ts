import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { BooksService } from './books/books.service';
import { AuthorsService } from './authors/authors.service';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
  let appController: AppController;
  let booksService: BooksService;
  let authorsService: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [BooksService, AuthorsService, PrismaService],
    }).compile();

    appController = module.get<AppController>(AppController);
    booksService = module.get<BooksService>(BooksService);
    authorsService = module.get<AuthorsService>(AuthorsService);
  });

  // Authors Endpoints

  describe('getAllAuthors', () => {
    it('should return an array of authors', async () => {
      const mockAuthors = [
        { id: 1, name: 'Author 1', bio: 'Bio 1' },
        { id: 2, name: 'Author 2', bio: 'Bio 2' },
      ];

      jest.spyOn(authorsService, 'getAllAuthors').mockResolvedValue(mockAuthors);

      const result = await appController.getAllAuthors();

      expect(result).toEqual(mockAuthors);
    });
  });

  describe('getAuthorById', () => {
    it('should return a specific author by ID', async () => {
      const authorId = 1;
      const mockAuthor = { id: authorId, name: 'Test Author', bio: 'Test Bio' };

      jest.spyOn(authorsService, 'getAuthorById').mockResolvedValue(mockAuthor);

      const result = await appController.getAuthorById(authorId);

      expect(result).toEqual(mockAuthor);
    });
  });

  describe('createAuthor', () => {
    it('should create a new author', async () => {
      const authorData = { name: 'New Author', bio: 'New Bio' };
      const createdAuthor = { id: 3, ...authorData };

      jest.spyOn(authorsService, 'createAuthor').mockResolvedValue(createdAuthor);

      const result = await appController.createAuthor(authorData);

      expect(result).toEqual(createdAuthor);
    });
  });

  describe('updateAuthor', () => {
    it('should update an existing author', async () => {
      const authorId = 1;
      const authorData = { name: 'Updated Author', bio: 'Updated Bio' };
      const updatedAuthor = { id: authorId, ...authorData };

      jest.spyOn(authorsService, 'updateAuthor').mockResolvedValue(updatedAuthor);

      const result = await appController.updateAuthor(authorId, authorData);

      expect(result).toEqual(updatedAuthor);
    });
  });

  describe('deleteAuthor', () => {
    it('should delete an existing author', async () => {
      const authorId = 1;
      const deletedAuthor = { id: authorId, name: 'Author 1', bio: 'Bio 1' };

      jest.spyOn(authorsService, 'deleteAuthor').mockResolvedValue(deletedAuthor);

      const result = await appController.deleteAuthor(authorId);

      expect(result).toEqual(deletedAuthor);
    });
  });

  // Books Endpoints

  describe('getAllBooks', () => {
    it('should return an array of books', async () => {
      const mockBooks = [
        {
          id: 1,
          title: 'Book 1',
          authorId: 1,
          description: 'Description 1',
          publishedYear: 2022,
          stockCount: 10,
        },
        {
          id: 2,
          title: 'Book 2',
          authorId: 2,
          description: 'Description 2',
          publishedYear: 2021,
          stockCount: 15,
        },
      ];

      jest.spyOn(booksService, 'getAllBooks').mockResolvedValue(mockBooks);

      const result = await appController.getAllBooks();

      expect(result).toEqual(mockBooks);
    });
  });

  describe('getBookById', () => {
    it('should return a specific book by ID', async () => {
      const bookId = 1;
      const mockBook = {
        id: bookId,
        title: 'Test Book',
        authorId: 1,
        description: 'Test Description',
        publishedYear: 2023,
        stockCount: 20,
      };

      jest.spyOn(booksService, 'getBookById').mockResolvedValue(mockBook);

      const result = await appController.getBookById(bookId);

      expect(result).toEqual(mockBook);
    });
  });

  describe('createBook', () => {
    it('should create a new book', async () => {
      const bookData = {
        title: 'New Book',
        authorId: 3,
        description: 'New Description',
        publishedYear: 2024,
        stockCount: 25,
      };

      const createdBook = { id: 3, ...bookData };

      jest.spyOn(booksService, 'createBook').mockResolvedValue(createdBook);

      const result = await appController.createBook(bookData);

      expect(result).toEqual(createdBook);
    });
  });

  describe('updateBook', () => {
    it('should update an existing book', async () => {
      const bookId = 1;
      const bookData = {
        title: 'Updated Book',
        authorId: 1,
        description: 'Updated Description',
        publishedYear: 2023,
        stockCount: 30,
      };

      const updatedBook = { id: bookId, ...bookData };

      jest.spyOn(booksService, 'updateBook').mockResolvedValue(updatedBook);

      const result = await appController.updateBook(bookId, bookData);

      expect(result).toEqual(updatedBook);
    });
  });

  describe('deleteBook', () => {
    it('should delete an existing book', async () => {
      const bookId = 1;
      const deletedBook = {
        id: bookId,
        title: 'Book 1',
        authorId: 1,
        description: 'Description 1',
        publishedYear: 2022,
        stockCount: 10,
      };

      jest.spyOn(booksService, 'deleteBook').mockResolvedValue(deletedBook);

      const result = await appController.deleteBook(bookId);

      expect(result).toEqual(deletedBook);
    });
  });
});
