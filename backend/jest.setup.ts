
import dotenv from 'dotenv';
import { prisma } from '@/app';

dotenv.config({
    path: '.env.test',
});


if (!process.env.DATABASE_NAME?.includes('test')) {
    throw new Error('❌ Prisma NÃO está usando banco de TESTE');
}

if (process.env.TEST_TYPE === 'integration') {
    beforeAll(async () => {
        await prisma.$connect();
        await prisma.hero.deleteMany()
    });

    beforeEach(async () => {
        await prisma.$transaction([
            prisma.hero.deleteMany()
        ]);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });
}

beforeEach(async () => {
    jest.clearAllMocks();

});










