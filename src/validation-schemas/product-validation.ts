import { ParamSchema } from 'express-validator';
import { ICreateProduct } from '../interfaces';
import {
  PRODUCT_CODE_LENGTH,
  PRODUCT_NAME_LENGTH,
  PRODUCT_TOTAL_SALES_MIN,
} from '../constants';
import { MongoIdParamValidationSchema } from './mongo-id-param-validation';
import { IMongoIdParamSchema } from '../interfaces/common';

/** Default product properties */

const defaultProductCodeSchemaValidation: ParamSchema = {
  isString: {
    errorMessage: '"code" must be a string.',
  },
  isLength: {
    options: {
      max: PRODUCT_CODE_LENGTH.MAX,
      min: PRODUCT_CODE_LENGTH.MIN,
    },
    errorMessage: `"code" length must be within ${PRODUCT_CODE_LENGTH.MIN} - ${PRODUCT_CODE_LENGTH.MAX} characters.`,
  },
  in: 'body',
};

const defaultProductNameSchemaValidation: ParamSchema = {
  isString: {
    errorMessage: '"name" must be a string.',
  },
  isLength: {
    options: {
      max: PRODUCT_NAME_LENGTH.MAX,
      min: PRODUCT_NAME_LENGTH.MIN,
    },
    errorMessage: `"name" length must be within ${PRODUCT_NAME_LENGTH.MIN} - ${PRODUCT_NAME_LENGTH.MAX} characters.`,
  },
  in: 'body',
};

/** Create product validation schema */

type IProductValidationSchema = Record<keyof ICreateProduct, ParamSchema>;

const CreateProductValidationSchema: IProductValidationSchema = {
  code: defaultProductCodeSchemaValidation,
  name: defaultProductNameSchemaValidation,
  totalRevenue: {
    isInt: true,
    optional: true,
    errorMessage: '"totalRevenue" must be a number.',
  },
  totalSales: {
    isInt: {
      options: {
        min: PRODUCT_TOTAL_SALES_MIN,
      },
      errorMessage: '"totalSales" must be a positive number.',
    },
    optional: true,
    in: 'body',
  },
};

/** Update product validation schema */

type IUpdateProductValidationSchema = Record<
  keyof IProductValidationSchema & IMongoIdParamSchema,
  ParamSchema
>;

const UpdateProductValidationSchema: IUpdateProductValidationSchema = {
  ...CreateProductValidationSchema,
  code: {
    ...defaultProductCodeSchemaValidation,
    optional: true,
  },
  name: {
    ...defaultProductNameSchemaValidation,
    optional: true,
  },
  ...MongoIdParamValidationSchema,
};

/** Get product by code validation schema */

const ProductCodeParamValidationSchema: { code: ParamSchema } = {
  code: {
    ...defaultProductCodeSchemaValidation,
    in: 'params',
  },
};

/** Get product by name validation schema */

const ProductNameParamValidationSchema: { name: ParamSchema } = {
  name: {
    ...defaultProductNameSchemaValidation,
    in: 'params',
  },
};

/** Exporting all schemas */

export {
  CreateProductValidationSchema,
  UpdateProductValidationSchema,
  ProductCodeParamValidationSchema,
  ProductNameParamValidationSchema,
};
