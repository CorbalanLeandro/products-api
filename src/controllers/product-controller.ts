import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { matchedData } from 'express-validator';

import { productService } from '../services';
import { ICreateProduct, IProductResponse } from '../interfaces';

class ProductController {
  async createProduct(req: Request, res: Response<IProductResponse>) {
    const validatedData = matchedData(req) as ICreateProduct;
    const createdProduct = await productService.createProduct(validatedData);

    return res.status(StatusCodes.CREATED).json({ product: createdProduct });
  }
}

export default new ProductController();
