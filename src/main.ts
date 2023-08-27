import express from 'express';

import config from './config';
import database from './database';

const app = express();

// Middlewares
app.use(express.json());

// Database
database
  .then(() => {
    // Start server only when the connection to the database is ok
    const appPort = config.app.port;
    // Server on
    app.listen(appPort, () => console.log(`Server running on port ${appPort}`));
  })
  .catch((err) => console.error('Cannot connect to MongoDB', { err }));
