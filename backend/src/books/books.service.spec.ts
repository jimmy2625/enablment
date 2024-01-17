import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaService } from '../prisma/prisma.service';

describe('BooksService', () => {
  let booksService: BooksService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, PrismaService],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

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

      jest.spyOn(prismaService.client.book, 'findMany').mockResolvedValue(mockBooks);

      const result = await booksService.getAllBooks();

      expect(result).toEqual(mockBooks);
    });

    it('should handle errors and throw an exception', async () => {
      jest.spyOn(prismaService.client.book, 'findMany').mockRejectedValue(new Error('Some error'));

      const getAllBooksPromise = booksService.getAllBooks();

      await expect(getAllBooksPromise).rejects.toThrowError('Some error');
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

      jest.spyOn(prismaService.client.book, 'findUnique').mockResolvedValue(mockBook);

      const result = await booksService.getBookById(bookId);

      expect(result).toEqual(mockBook);
    });

    it('should handle errors and throw an exception', async () => {
      const bookId = 1;

      jest.spyOn(prismaService.client.book, 'findUnique').mockRejectedValue(new Error('Some error'));

      const getBookByIdPromise = booksService.getBookById(bookId);

      await expect(getBookByIdPromise).rejects.toThrowError('Some error');
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

      jest.spyOn(prismaService.client.book, 'create').mockResolvedValue(createdBook);

      const result = await booksService.createBook(bookData);

      expect(result).toEqual(createdBook);
    });

    it('should handle errors and throw an exception', async () => {
      const bookData = {
        title: 'New Book',
        authorId: 3,
        description: 'New Description',
        publishedYear: 2024,
        stockCount: 25,
      };

      jest.spyOn(prismaService.client.book, 'create').mockRejectedValue(new Error('Some error'));

      const createBookPromise = booksService.createBook(bookData);

      await expect(createBookPromise).rejects.toThrowError('Some error');
    });
  });

  describe('updateBook', () => {
    it('should update an existing book', async () => {
      const bookId = 4;
      const bookData = {
        title: 'Updated Book',
        authorId: 1,
        description: 'Updated Description',
        publishedYear: 2023,
        stockCount: 30,
      };

      const updatedBook = { id: bookId, ...bookData };

      jest.spyOn(prismaService.client.book, 'update').mockResolvedValue(updatedBook);

      const result = await booksService.updateBook(bookId, bookData);

      expect(result).toEqual(updatedBook);
    });

    it('should handle errors and throw an exception', async () => {
      const bookId = 4;
      const bookData = {
        title: 'Updated Book',
        authorId: 1,
        description: 'Updated Description',
        publishedYear: 2023,
        stockCount: 30,
      };

      jest.spyOn(prismaService.client.book, 'update').mockRejectedValue(new Error('Some error'));

      const updateBookPromise = booksService.updateBook(bookId, bookData);

      await expect(updateBookPromise).rejects.toThrowError('Some error');
    });
  });

  describe('deleteBook', () => {
    it('should delete an existing book', async () => {
      const bookId = 4;
      const deletedBook = {
        id: bookId,
        title: 'Book 1',
        authorId: 1,
        description: 'Description 1',
        publishedYear: 2022,
        stockCount: 10,
      };

      jest.spyOn(prismaService.client.book, 'delete').mockResolvedValue(deletedBook);

      const result = await booksService.deleteBook(bookId);

      expect(result).toEqual(deletedBook);
    });

    it('should handle errors and throw an exception', async () => {
      const bookId = 4;

      jest.spyOn(prismaService.client.book, 'delete').mockRejectedValue(new Error('Some error'));

      const deleteBookPromise = booksService.deleteBook(bookId);

      await expect(deleteBookPromise).rejects.toThrowError('Some error');
    });
  });
});
