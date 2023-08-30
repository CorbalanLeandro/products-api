import { ParamSchema } from 'express-validator';
import { IMongoId } from '../interfaces/common';

type IMongoIdParamValidationSchema = Record<keyof IMongoId, ParamSchema>;

const MongoIdParamValidationSchema: IMongoIdParamValidationSchema = {
  id: {
    in: 'params',
    isMongoId: true,
    errorMessage: 'Param "id" must be a valid Mongo id',
  },
};

export { MongoIdParamValidationSchema };
