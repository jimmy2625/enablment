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
exports.AuthorResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const authors_service_1 = require("../authors/authors.service");
const author_type_1 = require("./author.type");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const create_author_dto_1 = require("../authors/dto/create-author.dto");
let AuthorResolver = class AuthorResolver {
    constructor(authorsService) {
        this.authorsService = authorsService;
    }
    async authors() {
        return this.authorsService.getAllAuthors();
    }
    async author(id) {
        const author = await this.authorsService.getAuthorById(id);
        if (!author) {
            throw new common_1.NotFoundException(`Author with ID ${id} not found`);
        }
        return author;
    }
    async createAuthor(data) {
        try {
            await this.validateAuthorData(data);
            return this.authorsService.createAuthor(data);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async updateAuthor(id, data) {
        try {
            await this.validateAuthorData(data);
            const existingAuthor = await this.authorsService.getAuthorById(id);
            if (!existingAuthor) {
                throw new common_1.NotFoundException(`Author with ID ${id} not found`);
            }
            return this.authorsService.updateAuthor(id, data);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async deleteAuthor(id) {
        try {
            const existingAuthor = await this.authorsService.getAuthorById(id);
            if (!existingAuthor) {
                throw new common_1.NotFoundException(`Author with ID ${id} not found`);
            }
            return this.authorsService.deleteAuthor(id);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async validateAuthorData(data) {
        try {
            await (0, class_validator_1.validateOrReject)(Object.assign(new create_author_dto_1.CreateAuthorDto(), data), { skipMissingProperties: true });
        }
        catch (errors) {
            throw errors;
        }
    }
};
exports.AuthorResolver = AuthorResolver;
__decorate([
    (0, graphql_1.Query)(() => [author_type_1.AuthorType]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthorResolver.prototype, "authors", null);
__decorate([
    (0, graphql_1.Query)(() => author_type_1.AuthorType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthorResolver.prototype, "author", null);
__decorate([
    (0, graphql_1.Mutation)(() => author_type_1.AuthorType),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_author_dto_1.CreateAuthorDto]),
    __metadata("design:returntype", Promise)
], AuthorResolver.prototype, "createAuthor", null);
__decorate([
    (0, graphql_1.Mutation)(() => author_type_1.AuthorType),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_author_dto_1.CreateAuthorDto]),
    __metadata("design:returntype", Promise)
], AuthorResolver.prototype, "updateAuthor", null);
__decorate([
    (0, graphql_1.Mutation)(() => author_type_1.AuthorType),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AuthorResolver.prototype, "deleteAuthor", null);
exports.AuthorResolver = AuthorResolver = __decorate([
    (0, graphql_1.Resolver)(() => author_type_1.AuthorType),
    __metadata("design:paramtypes", [authors_service_1.AuthorsService])
], AuthorResolver);
//# sourceMappingURL=author.resolver.js.map