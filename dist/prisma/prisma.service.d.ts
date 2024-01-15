import { PrismaClient } from '@prisma/client';
export declare class PrismaService {
    client: PrismaClient;
    book: any;
    author: any;
    constructor();
    onModuleDestroy(): Promise<void>;
}
