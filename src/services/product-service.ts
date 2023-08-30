import { MONGO_SORT } from '../constants';
import { ICreateProduct, IUpdateProduct } from '../interfaces';
import { ProductDocument, ProductModel } from '../models';

class ProductService {
  /**
   * Creates a product in the database and return the created product.
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

  /**
   * Updates a product by id.
   *
   * @param {string} id
   * @param {IUpdateProduct} productData
   * @returns {Promise<boolean>} Boolean indicating if a document was modified.
   */
  async updateProduct(
    id: string,
    productData: IUpdateProduct,
  ): Promise<boolean> {
    const updateResult = await ProductModel.updateOne(
      { _id: id },
      { $set: productData, $inc: { __v: 1 } },
      { runValidators: true },
    );

    return updateResult.modifiedCount === 1;
  }

  /**
   * Deletes a product by id.
   *
   * @param {string} id
   * @returns {Promise<boolean>} Boolean indicating if a document was deleted.
   */
  async deleteProduct(id: string): Promise<boolean> {
    const deleteResult = await ProductModel.deleteOne({ _id: id });

    return deleteResult.deletedCount === 1;
  }
}

export default new ProductService();
