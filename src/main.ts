import express, { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import config from './config';
import database from './database';
import { APP_GLOBAL_PREFIX } from './constants';
import { productRoutes } from './routes';
import { Error as MongooseError } from 'mongoose';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use(`${APP_GLOBAL_PREFIX}/products`, productRoutes);

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  if (
    err instanceof MongooseError.ValidationError ||
    (err &&
      typeof err === 'object' &&
      'code' in err &&
      'message' in err &&
      err.code === 11000)
  ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: ReasonPhrases.BAD_REQUEST,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message,
    });
  }

  console.error({ error: err });

  // Respond generic error
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: ReasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  });
});

// Database
database
  .then(() => {
    // Start server only when the connection to the database is ok
    const appPort = config.app.port;

    // Server on
    app.listen(appPort, () =>
      console.log(`Server running on port: ${appPort}`),
    );
  })
  .catch((err) => console.error('Cannot connect to MongoDB', { error: err }));
