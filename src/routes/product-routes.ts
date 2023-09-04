import { Router } from 'express';
import { checkSchema } from 'express-validator';

import {
  CreateProductValidationSchema,
  ProductCodeParamValidationSchema,
  ProductNameParamValidationSchema,
  UpdateProductValidationSchema,
  MongoIdParamValidationSchema,
  MongoSortQueryValidationSchema,
  ProductNameQuerySchemaValidation,
  ProductCodeQuerySchemaValidation,
} from '../validation-schemas';

import { validateRequest, withErrorHandling } from '../middlewares';
import { productController } from '../controllers';

const router = Router();

router.post(
  '/',
  checkSchema(CreateProductValidationSchema),
  validateRequest,
  withErrorHandling(productController.createProduct),
);

router.get(
  '/',
  checkSchema({
    ...MongoSortQueryValidationSchema,
    ...ProductCodeQuerySchemaValidation,
    ...ProductNameQuerySchemaValidation,
  }),
  validateRequest,
  withErrorHandling(productController.findAllProducts),
);

router.get(
  '/:_id',
  checkSchema(MongoIdParamValidationSchema),
  validateRequest,
  withErrorHandling(productController.findOneProduct),
);

router.patch(
  '/:_id',
  checkSchema(UpdateProductValidationSchema),
  validateRequest,
  withErrorHandling(productController.updateProduct),
);

router.delete(
  '/:_id',
  checkSchema(MongoIdParamValidationSchema),
  validateRequest,
  withErrorHandling(productController.deleteProduct),
);

router.get(
  '/code/:code',
  checkSchema(ProductCodeParamValidationSchema),
  validateRequest,
  withErrorHandling(productController.findOneProduct),
);

router.get(
  '/name/:name',
  checkSchema(ProductNameParamValidationSchema),
  validateRequest,
  withErrorHandling(productController.findOneProduct),
);

router.get('/best-seller', withErrorHandling(productController.findBestSeller));

router.get(
  '/best-revenue',
  withErrorHandling(productController.findBestRevenue),
);

export { router as productRoutes };
