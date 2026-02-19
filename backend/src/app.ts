import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { getCorsConfig } from './shared/config/cors';
import { heroesRoutes } from '@/modules/heroes/routes';
import { AppError } from '@/shared/errors/AppError';
import { createPrismaClient } from './shared/database/prisma';

export const prisma = createPrismaClient();

const app = express();
app.use(cors(getCorsConfig()));
app.use(express.json());

app.get('/', (_req, res) => {
    return res.json({ status: 'ok' });
});

app.use('/heroes', heroesRoutes);

app.get('/health', (_req, res) => {
    return res.json({ status: 'ok' });
});

app.use(
    (error: Error, _req: Request, res: Response, _next: NextFunction) => {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }

        console.error(error);

        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    }
);

export default app;
