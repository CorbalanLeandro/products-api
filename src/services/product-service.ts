import { MONGO_SORT } from '../constants';
import { ICreateProduct } from '../interfaces';
import { ProductDocument, ProductModel } from '../models';

class ProductService {
  /**
   * Creates a product in the database and return the created product
   *
   * @param {ICreateProduct} data
   * @returns {Promise<ProductDocument>}
   */
  async createProduct(data: ICreateProduct): Promise<ProductDocument> {
    const createdProduct = await ProductModel.create(data);

    return createdProduct;
  }

  /**
   * Find all products in the database sorted by creation date.
   *
   * @param {MONGO_SORT} sort
   * @returns {Promise<ProductDocument[]>}
   */
  async findAllProducts(sort?: MONGO_SORT): Promise<ProductDocument[]> {
    return ProductModel.find({}, {}, { sort: { createdAt: sort } });
  }
}

export default new ProductService();
