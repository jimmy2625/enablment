import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthorsService', () => {
  let authorsService: AuthorsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsService, PrismaService],
    }).compile();

    authorsService = module.get<AuthorsService>(AuthorsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('getAuthorById', () => {
    it('should return a specific author by ID', async () => {
      const authorId = 1;
      const mockAuthor = { id: authorId, name: 'Test Author', bio: 'hello' };

      jest.spyOn(prismaService.client.author, 'findUnique').mockResolvedValue(mockAuthor);

      const result = await authorsService.getAuthorById(authorId);

      expect(result).toEqual(mockAuthor);
    });

    it('should handle errors and throw an exception', async () => {
      const authorId = 1;

      jest.spyOn(prismaService.client.author, 'findUnique').mockRejectedValue(new Error('Some error'));

      const getAuthorByIdPromise = authorsService.getAuthorById(authorId);

      await expect(getAuthorByIdPromise).rejects.toThrowError('Some error');
    });
  });

  describe('createAuthor', () => {
    it('should create a new author', async () => {
      const authorData = { name: 'New Author', bio: 'tester tester' };
      const createdAuthor = { id: 3, ...authorData };

      jest.spyOn(prismaService.client.author, 'create').mockResolvedValue(createdAuthor);

      const result = await authorsService.createAuthor(authorData);

      expect(result).toEqual(createdAuthor);
    });

    it('should handle errors and throw an exception', async () => {
      const authorData = { name: 'New Author' };

      jest.spyOn(prismaService.client.author, 'create').mockRejectedValue(new Error('Some error'));

      const createAuthorPromise = authorsService.createAuthor(authorData);

      await expect(createAuthorPromise).rejects.toThrowError('Some error');
    });
  });

  describe('updateAuthor', () => {
    it('should update an existing author', async () => {
      const authorId = 1;
      const authorData = { name: 'Updated Author', bio: 'super tester' };
      const updatedAuthor = { id: authorId, ...authorData };

      jest.spyOn(prismaService.client.author, 'update').mockResolvedValue(updatedAuthor);

      const result = await authorsService.updateAuthor(authorId, authorData);

      expect(result).toEqual(updatedAuthor);
    });

    it('should handle errors and throw an exception', async () => {
      const authorId = 1;
      const authorData = { name: 'Updated Author' };

      jest.spyOn(prismaService.client.author, 'update').mockRejectedValue(new Error('Some error'));

      const updateAuthorPromise = authorsService.updateAuthor(authorId, authorData);

      await expect(updateAuthorPromise).rejects.toThrowError('Some error');
    });
  });

  describe('deleteAuthor', () => {
    it('should delete an existing author', async () => {
      const authorId = 1;
      const deletedAuthor = { id: authorId, name: 'Author 1', bio: 'jeg elsker unit tests' };

      jest.spyOn(prismaService.client.author, 'delete').mockResolvedValue(deletedAuthor);

      const result = await authorsService.deleteAuthor(authorId);

      expect(result).toEqual(deletedAuthor);
    });

    it('should handle errors and throw an exception', async () => {
      const authorId = 1;

      jest.spyOn(prismaService.client.author, 'delete').mockRejectedValue(new Error('Some error'));

      const deleteAuthorPromise = authorsService.deleteAuthor(authorId);

      await expect(deleteAuthorPromise).rejects.toThrowError('Some error');
    });
  });
});
