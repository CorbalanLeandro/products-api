import { Router } from 'express';
import { checkSchema } from 'express-validator';

import {
  CreateProductValidationSchema,
  ProductCodeParamValidationSchema,
  ProductNameParamValidationSchema,
  UpdateProductValidationSchema,
  MongoIdParamValidationSchema,
  MongoSortQueryValidationSchema,
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
  checkSchema(MongoSortQueryValidationSchema),
  validateRequest,
  withErrorHandling(productController.findAllProducts),
);

router.patch(
  '/:id',
  checkSchema(UpdateProductValidationSchema),
  validateRequest,
  withErrorHandling(productController.updateProduct),
);

router.delete(
  '/:id',
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

router.get('/best-seller', (_req, res) => {
  res.send('Getting best seller');
});

router.get('/best-revenue', (_req, res) => {
  res.send('Getting product with more revenue');
});

export { router as productRoutes };
