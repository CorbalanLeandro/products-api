import { ParamSchema } from 'express-validator';
import { IMongoSortQuery } from '../interfaces/common';
import { MONGO_SORT } from '../constants';

type IMongoSortQueryValidationSchema = Record<
  keyof IMongoSortQuery,
  ParamSchema
>;

const MongoSortQueryValidationSchema: IMongoSortQueryValidationSchema = {
  sort: {
    in: 'query',
    isIn: { options: [Object.values(MONGO_SORT)] },
    errorMessage: 'Query param "sort" must be a valid mongo sort value',
    optional: true,
  },
};

export { MongoSortQueryValidationSchema };
