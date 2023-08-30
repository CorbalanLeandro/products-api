import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle errors
 *
 * @param {(req: Request, res: Response, next: NextFunction) => Promise<T> | T} fn
 * @returns {(req: Request, res: Response, next: NextFunction) => Promise<void>}
 */
export function withErrorHandling<T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T> | T,
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
}
