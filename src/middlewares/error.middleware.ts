import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { logger } from '@utils/logger';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Something went wrong';
    const data: object = error.data || {};

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`, data);
    res.status(status).json({ message, data });
  } catch (exp) {
    next(exp);
  }
};

export default errorMiddleware;
