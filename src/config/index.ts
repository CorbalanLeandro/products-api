import dotEnv from 'dotenv';

import { demandEnv } from '../utils';
import { DEFAULT_APP_PORT } from '../constants';

dotEnv.config();

export interface IAppConfig {
  app: {
    env: string;
    port: number;
  };
  db: {
    uri: string;
  };
}

const dbUrl = demandEnv('DB_URL'),
  dbName = demandEnv('DB_NAME'),
  dbParams = demandEnv('DB_PARAMS');

const config: IAppConfig = {
  app: {
    env: demandEnv('ENV'),
    port: parseInt(demandEnv('PORT', DEFAULT_APP_PORT), 10),
  },
  db: {
    uri: `${dbUrl}/${dbName}?${dbParams}`,
  },
};

export default config;
