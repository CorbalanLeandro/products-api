import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

/**
 * Validates that the request does not have any errors after
 * express validator checkSchema method run.
 *
 * If there is an error, will return a bad request response with the errors
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: ReasonPhrases.BAD_REQUEST, errors: errors.array() });
  } else {
    next();
  }
}
