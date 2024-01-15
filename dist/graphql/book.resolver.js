"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const books_service_1 = require("../books/books.service");
const book_type_1 = require("./book.type");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let CreateBookInput = class CreateBookInput {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBookInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateBookInput.prototype, "authorId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateBookInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateBookInput.prototype, "publishedYear", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], CreateBookInput.prototype, "stockCount", void 0);
CreateBookInput = __decorate([
    (0, graphql_1.InputType)()
], CreateBookInput);
let BookResolver = class BookResolver {
    constructor(booksService) {
        this.booksService = booksService;
    }
    async books() {
        return this.booksService.getAllBooks();
    }
    async book(id) {
        const book = await this.booksService.getBookById(id);
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }
    async createBook(data) {
        try {
            await this.validateBookData(data);
            return this.booksService.createBook(data);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updateBook(id, data) {
        try {
            await this.validateBookData(data);
            const existingBook = await this.booksService.getBookById(id);
            if (!existingBook) {
                throw new common_1.NotFoundException(`Book with ID ${id} not found`);
            }
            return this.booksService.updateBook(id, data);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteBook(id) {
        try {
            const existingBook = await this.booksService.getBookById(id);
            if (!existingBook) {
                throw new common_1.NotFoundException(`Book with ID ${id} not found`);
            }
            return this.booksService.deleteBook(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async validateBookData(data) {
        try {
            await (0, class_validator_1.validateOrReject)(Object.assign(new CreateBookInput(), data), { skipMissingProperties: true });
        }
        catch (errors) {
            throw errors;
        }
    }
};
exports.BookResolver = BookResolver;
__decorate([
    (0, graphql_1.Query)(() => [book_type_1.BookType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "books", null);
__decorate([
    (0, graphql_1.Query)(() => book_type_1.BookType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "book", null);
__decorate([
    (0, graphql_1.Mutation)(() => book_type_1.BookType),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBookInput]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "createBook", null);
__decorate([
    (0, graphql_1.Mutation)(() => book_type_1.BookType),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, CreateBookInput]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "updateBook", null);
__decorate([
    (0, graphql_1.Mutation)(() => book_type_1.BookType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookResolver.prototype, "deleteBook", null);
exports.BookResolver = BookResolver = __decorate([
    (0, graphql_1.Resolver)(() => book_type_1.BookType),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BookResolver);
//# sourceMappingURL=book.resolver.js.map