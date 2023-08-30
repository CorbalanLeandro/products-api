import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { matchedData } from 'express-validator';

import { productService } from '../services';

import {
  ICreateProduct,
  IProductResponse,
  IProductsResponse,
  IResultResponse,
  IMongoSortQuery,
  IUpdateProduct,
  IMongoIdParam,
} from '../interfaces';

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
   * Finds all products.
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

  /**
   * Updates a product and return a result response.
   *
   * @param {Request} req
   * @param {Response<IResultResponse>} res
   * @returns {Promise<Response<IResultResponse>>}
   */
  async updateProduct(
    req: Request,
    res: Response<IResultResponse>,
  ): Promise<Response<IResultResponse>> {
    const validatedData = matchedData(req) as IUpdateProduct & IMongoIdParam;
    const { id, ...productData } = validatedData;

    const result = await productService.updateProduct(id, productData);

    let statusCode: number;

    if (!result) {
      // even if we set the same value to a property mongo return the result as it was modified
      // so if nothing is modified means that the document was not found
      statusCode = StatusCodes.NOT_FOUND;
    } else {
      statusCode = StatusCodes.OK;
    }

    return res.status(statusCode).json({ result });
  }

  /**
   * Deletes a product and return a result response.
   *
   * @param {Request} req
   * @param {Response<IResultResponse>} res
   * @returns {Promise<Response<IResultResponse>>}
   */
  async deleteProduct(
    req: Request,
    res: Response<IResultResponse>,
  ): Promise<Response<IResultResponse>> {
    const validatedData = matchedData(req) as IMongoIdParam;
    const { id } = validatedData;

    const result = await productService.deleteProduct(id);

    let statusCode: number;

    if (!result) {
      statusCode = StatusCodes.NOT_FOUND;
    } else {
      statusCode = StatusCodes.OK;
    }

    return res.status(statusCode).json({ result });
  }
}

export default new ProductController();
