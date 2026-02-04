import express, { Request, Response, NextFunction } from 'express';
// import 'express-async-errors';

import { heroesRoutes } from '@/modules/heroes/routes';
import { AppError } from '@/shared/errors/AppError';

const app = express();

// Middleware para JSON
app.use(express.json());

app.get('/', (_req, res) => {
    return res.json({ status: 'ok' });
});

// Rotas
app.use('/heroes', heroesRoutes);

// Health check (opcional)
app.get('/health', (_req, res) => {
    return res.json({ status: 'ok' });
});

// Tratamento global de erros
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
