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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("./books/books.service");
const authors_service_1 = require("./authors/authors.service");
let AppController = class AppController {
    constructor(booksService, authorsService) {
        this.booksService = booksService;
        this.authorsService = authorsService;
    }
    async getAllBooks() {
        return this.handleServiceCall(() => this.booksService.getAllBooks());
    }
    async getBookById(id) {
        return this.handleServiceCall(() => this.booksService.getBookById(id));
    }
    async createBook(data) {
        return this.handleServiceCall(() => this.booksService.createBook(data), common_1.HttpStatus.CREATED);
    }
    async updateBook(id, data) {
        return this.handleServiceCall(() => this.booksService.updateBook(id, data));
    }
    async deleteBook(id) {
        return this.handleServiceCall(() => this.booksService.deleteBook(id));
    }
    async getAllAuthors() {
        return this.handleServiceCall(() => this.authorsService.getAllAuthors());
    }
    async getAuthorById(id) {
        return this.handleServiceCall(() => this.authorsService.getAuthorById(id));
    }
    async createAuthor(data) {
        return this.handleServiceCall(() => this.authorsService.createAuthor(data), common_1.HttpStatus.CREATED);
    }
    async updateAuthor(id, data) {
        return this.handleServiceCall(() => this.authorsService.updateAuthor(id, data));
    }
    async deleteAuthor(id) {
        return this.handleServiceCall(() => this.authorsService.deleteAuthor(id));
    }
    async handleServiceCall(serviceCall, successStatus = common_1.HttpStatus.OK) {
        try {
            return await serviceCall();
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to process request');
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('/books'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)('/books/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getBookById", null);
__decorate([
    (0, common_1.Post)('/books'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createBook", null);
__decorate([
    (0, common_1.Put)('/books/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateBook", null);
__decorate([
    (0, common_1.Delete)('/books/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteBook", null);
__decorate([
    (0, common_1.Get)('/authors'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAllAuthors", null);
__decorate([
    (0, common_1.Get)('/authors/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAuthorById", null);
__decorate([
    (0, common_1.Post)('/authors'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "createAuthor", null);
__decorate([
    (0, common_1.Put)('/authors/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateAuthor", null);
__decorate([
    (0, common_1.Delete)('/authors/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "deleteAuthor", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [books_service_1.BooksService,
        authors_service_1.AuthorsService])
], AppController);
//# sourceMappingURL=app.controller.js.map