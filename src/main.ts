import express from 'express';

import config from './config';
import database from './database';
import { APP_GLOBAL_PREFIX } from './constants';
import { productRoutes } from './routes';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use(`${APP_GLOBAL_PREFIX}/products`, productRoutes);

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
  .catch((err) => console.error('Cannot connect to MongoDB', { err }));
