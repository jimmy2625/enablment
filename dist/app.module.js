"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const author_resolver_1 = require("./graphql/author.resolver");
const book_resolver_1 = require("./graphql/book.resolver");
const apollo_1 = require("@nestjs/apollo");
const app_controller_1 = require("./app.controller");
const books_service_1 = require("./books/books.service");
const authors_service_1 = require("./authors/authors.service");
const prisma_service_1 = require("./prisma/prisma.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: './schema.gql',
                sortSchema: true,
                playground: true,
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [book_resolver_1.BookResolver, author_resolver_1.AuthorResolver, books_service_1.BooksService, authors_service_1.AuthorsService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map