import { ICreateProduct } from '../interfaces';
import { ProductDocument, ProductModel } from '../models';

class ProductService {
  async createProduct(data: ICreateProduct): Promise<ProductDocument> {
    const createdProduct = await ProductModel.create(data);

    return createdProduct;
  }
}

export default new ProductService();
