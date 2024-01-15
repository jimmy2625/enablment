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
exports.AuthorsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const class_validator_1 = require("class-validator");
let AuthorsService = class AuthorsService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAllAuthors() {
        return this.prismaService.client.author.findMany();
    }
    async getAuthorById(id) {
        const author = await this.prismaService.client.author.findUnique({
            where: { id },
        });
        if (!author) {
            throw new common_1.NotFoundException(`Author with ID ${id} not found`);
        }
        return author;
    }
    async createAuthor(data) {
        try {
            await this.validateAuthorData(data);
            return await this.prismaService.client.author.create({ data });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to create author');
        }
    }
    async updateAuthor(id, data) {
        try {
            await this.validateAuthorData(data);
            const existingAuthor = await this.prismaService.client.author.findUnique({
                where: { id },
            });
            if (!existingAuthor) {
                throw new common_1.NotFoundException(`Author with ID ${id} not found`);
            }
            return await this.prismaService.client.author.update({
                where: { id },
                data,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message || 'Failed to update author');
        }
    }
    async deleteAuthor(id) {
        const existingAuthor = await this.prismaService.client.author.findUnique({
            where: { id },
        });
        if (!existingAuthor) {
            throw new common_1.NotFoundException(`Author with ID ${id} not found`);
        }
        return await this.prismaService.client.author.delete({
            where: { id },
        });
    }
    async getBooksByAuthorId(authorId) {
        return this.prismaService.client.book.findMany({
            where: {
                authorId: authorId,
            },
        });
    }
    async validateAuthorData(data) {
        const errors = await (0, class_validator_1.validate)(data);
        if (errors.length > 0) {
            throw new common_1.BadRequestException(errors);
        }
    }
};
exports.AuthorsService = AuthorsService;
exports.AuthorsService = AuthorsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AuthorsService);
//# sourceMappingURL=authors.service.js.map