import { ParamSchema } from 'express-validator';
import { IMongoSort } from '../interfaces/common';
import { MONGO_SORT } from '../constants';

type IMongoSortQueryValidationSchema = Record<keyof IMongoSort, ParamSchema>;

const MongoSortQueryValidationSchema: IMongoSortQueryValidationSchema = {
  sort: {
    in: 'query',
    isIn: { options: [Object.values(MONGO_SORT)] },
    errorMessage: 'Query param "sort" must be a valid mongo sort value',
    optional: true,
  },
};

export { MongoSortQueryValidationSchema };
