import { ParamSchema } from 'express-validator';
import { IMongoIdParam } from '../interfaces/common';

type IMongoIdParamValidationSchema = Record<keyof IMongoIdParam, ParamSchema>;

const MongoIdParamValidationSchema: IMongoIdParamValidationSchema = {
  id: {
    in: 'params',
    isMongoId: true,
    errorMessage: 'Param "id" must be a valid Mongo id',
  },
};

export { MongoIdParamValidationSchema };
