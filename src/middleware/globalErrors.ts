import { Request, Response, NextFunction } from 'express';
import { AppError } from '../error/AppError';
// @ts-ignore
export const globalErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        // @ts-ignore
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            data: err?.data
        });
    }

    console.error(err);
    // @ts-ignore
    return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
}
