import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { matchedData } from 'express-validator';

import { productService } from '../services';

import {
  ICreateProduct,
  IProductResponse,
  IProductsResponse,
} from '../interfaces';
import { IMongoSortQuery } from '../interfaces/common';

class ProductController {
  /**
   * Creates a product and respond with the created product
   *
   * @param {Request} req
   * @param {Response<IProductResponse>} res
   * @returns {Promise<Response<IProductResponse>>}
   */
  async createProduct(
    req: Request,
    res: Response<IProductResponse>,
  ): Promise<Response<IProductResponse>> {
    const validatedData = matchedData(req) as ICreateProduct;
    const createdProduct = await productService.createProduct(validatedData);

    return res.status(StatusCodes.CREATED).json({ product: createdProduct });
  }

  /**
   * Finds all products
   * If sort query param is received, all products will be sorted with the given value on the creation date.
   *
   * @param {Request} req
   * @param {Response<IProductsResponse>} res
   * @returns {Promise<Response<IProductsResponse>>}
   */
  async findAllProducts(
    req: Request,
    res: Response<IProductsResponse>,
  ): Promise<Response<IProductsResponse>> {
    const validatedData = matchedData(req) as IMongoSortQuery;
    const products = await productService.findAllProducts(validatedData.sort);

    return res.status(StatusCodes.OK).json({ products });
  }
}

export default new ProductController();
