import { Product } from '../models';

export interface ICreateProduct
  extends Pick<Product, 'name' | 'code'>,
    Partial<Pick<Product, 'totalRevenue' | 'totalSales'>> {}

export interface IUpdateProduct extends Partial<Product> {}

export interface IProductResponse {
  product: Product;
}
