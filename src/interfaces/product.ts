import { Product } from '../models';

export interface ICreateProduct
  extends Pick<Product, 'name' | 'code'>,
    Partial<Pick<Product, 'totalRevenue' | 'totalSales'>> {}

export interface IUpdateProduct extends Partial<Product> {}

export interface IProductResponse {
  product: Product | null;
}

export interface IProductsResponse {
  products: Product[];
}

export interface IProductName extends Pick<Product, 'name'> {}
export interface IProductCode extends Pick<Product, 'code'> {}
