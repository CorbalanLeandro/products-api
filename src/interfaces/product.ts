export interface IProduct {
  name: string;
  code: string;
  totalRevenue: number;
  totalSales: number;
}

export interface ICreateProduct
  extends Pick<IProduct, 'name' | 'code'>,
    Partial<Pick<IProduct, 'totalRevenue' | 'totalSales'>> {}

export interface IUpdateProduct extends Partial<IProduct> {}
