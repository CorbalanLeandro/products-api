import { Request, Response, Router } from 'express';
import { checkSchema } from 'express-validator';

import {
  CreateProductValidationSchema,
  ProductCodeParamValidationSchema,
  ProductNameParamValidationSchema,
  UpdateProductValidationSchema,
  MongoIdParamValidationSchema,
} from '../validation-schemas';

import { validateRequest } from '../middlewares';

const router = Router();

router.post(
  '/',
  checkSchema(CreateProductValidationSchema),
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({
      message: 'Creating a product',
      body: req.body,
    });
  },
);

router.get('/', (_req, res) => {
  res.send('Getting all products');
});

router.patch(
  '/:id',
  checkSchema(UpdateProductValidationSchema),
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({
      message: 'Updating a product by id',
      body: req.body,
      id: req.params.id,
    });
  },
);

router.delete(
  '/:id',
  checkSchema(MongoIdParamValidationSchema),
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({
      message: 'Deleting a product by id',
      id: req.params.id,
    });
  },
);

router.get(
  '/code/:code',
  checkSchema(ProductCodeParamValidationSchema),
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({
      message: 'Getting product by code',
      code: req.params.code,
    });
  },
);

router.get(
  '/name/:name',
  checkSchema(ProductNameParamValidationSchema),
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({
      message: 'Getting products by name',
      name: req.params.name,
    });
  },
);

router.get('/best-seller', (_req, res) => {
  res.send('Getting best seller');
});

router.get('/best-revenue', (_req, res) => {
  res.send('Getting product with more revenue');
});

export { router as productRoutes };
