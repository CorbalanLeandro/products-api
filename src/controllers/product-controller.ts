import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { productService } from '../services';
import { IProductResponse } from '../interfaces';

class ProductController {
  async createProduct(req: Request, res: Response<IProductResponse>) {
    const createdProduct = await productService.createProduct(req.body);

    return res.send({ product: createdProduct }).status(StatusCodes.CREATED);
  }
}

export default new ProductController();
