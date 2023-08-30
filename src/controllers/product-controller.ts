import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { matchedData } from 'express-validator';

import { productService } from '../services';
import { MONGO_SORT } from '../constants';

import {
  ICreateProduct,
  IProductResponse,
  IProductsResponse,
  IResultResponse,
  IMongoSort,
  IUpdateProduct,
  IMongoId,
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
    const validatedData = matchedData(req) as IMongoSort;
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
    const validatedData = matchedData(req) as IUpdateProduct & IMongoId;
    const { _id, ...productData } = validatedData;

    const result = await productService.updateProduct(_id, productData);

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
    const validatedData = matchedData(req) as IMongoId;
    const { _id } = validatedData;

    const result = await productService.deleteProduct(_id);

    let statusCode: number;

    if (!result) {
      statusCode = StatusCodes.NOT_FOUND;
    } else {
      statusCode = StatusCodes.OK;
    }

    return res.status(statusCode).json({ result });
  }

  /**
   * Finds a product.
   * If a product is not found, will respond with 404.
   *
   * @param {Request} req
   * @param {Response<IProductsResponse>} res
   * @returns {Promise<Response<IProductsResponse>>}
   */
  async findOneProduct(
    req: Request,
    res: Response<IProductResponse>,
  ): Promise<Response<IProductResponse>> {
    // https://express-validator.github.io/docs/api/matched-data/#matcheddata
    // if we are looking by code and we receive it as path param, `matchedData` will return that code
    // if we are looking by name and _id and we receive them on the body,  `matchedData` will return that name and _id
    const validatedData = matchedData(req);

    const productFound = await productService.findOneProduct(validatedData);

    let statusCode: number;

    if (!productFound) {
      statusCode = StatusCodes.NOT_FOUND;
    } else {
      statusCode = StatusCodes.OK;
    }

    return res.status(statusCode).json({ product: productFound });
  }

  /**
   * Finds the best seller product
   *
   * @param {Request} _req
   * @param {Response<IProductsResponse>} res
   * @returns {Promise<Response<IProductsResponse>>}
   */
  async findBestSeller(
    _req: Request,
    res: Response<IProductResponse>,
  ): Promise<Response<IProductResponse>> {
    const productFound = await productService.findOneProduct(
      undefined,
      undefined,
      { sort: { totalSales: MONGO_SORT.DESC } },
    );

    let statusCode: number;

    if (!productFound) {
      // maybe there are no products
      statusCode = StatusCodes.NOT_FOUND;
    } else {
      statusCode = StatusCodes.OK;
    }

    return res.status(statusCode).json({ product: productFound });
  }

  /**
   * Finds the product with more revenue
   *
   * @param {Request} _req
   * @param {Response<IProductsResponse>} res
   * @returns {Promise<Response<IProductsResponse>>}
   */
  async findBestRevenue(
    _req: Request,
    res: Response<IProductResponse>,
  ): Promise<Response<IProductResponse>> {
    const productFound = await productService.findOneProduct(
      undefined,
      undefined,
      { sort: { totalRevenue: MONGO_SORT.DESC } },
    );

    let statusCode: number;

    if (!productFound) {
      // maybe there are no products
      statusCode = StatusCodes.NOT_FOUND;
    } else {
      statusCode = StatusCodes.OK;
    }

    return res.status(statusCode).json({ product: productFound });
  }
}

export default new ProductController();
