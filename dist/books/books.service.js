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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
let BooksService = class BooksService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAllBooks() {
        return this.prismaService.client.book.findMany();
    }
    async getBookById(id) {
        const book = await this.prismaService.client.book.findUnique({
            where: { id },
        });
        if (!book) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return book;
    }
    async createBook(data) {
        try {
            const prismaData = {
                author: { connect: { id: data.authorId } },
                title: data.title,
                description: data.description,
                publishedYear: data.publishedYear,
                stockCount: data.stockCount,
            };
            return await this.prismaService.client.book.create({ data: prismaData });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to create book');
        }
    }
    async updateBook(id, data) {
        try {
            await this.validateBookData(data);
            const existingBook = await this.prismaService.client.book.findUnique({
                where: { id },
            });
            if (!existingBook) {
                throw new common_1.NotFoundException(`Book with ID ${id} not found`);
            }
            return await this.prismaService.client.book.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to update book');
        }
    }
    async deleteBook(id) {
        const existingBook = await this.prismaService.client.book.findUnique({
            where: { id },
        });
        if (!existingBook) {
            throw new common_1.NotFoundException(`Book with ID ${id} not found`);
        }
        return await this.prismaService.client.book.delete({
            where: { id },
        });
    }
    async validateBookData(data) {
        const errors = await (0, class_validator_1.validate)(data);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors);
        }
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BooksService);
//# sourceMappingURL=books.service.js.map