import { HydratedDocument } from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

import {
  PRODUCT_CODE_LENGTH,
  PRODUCT_NAME_LENGTH,
  PRODUCT_TOTAL_SALES_MIN,
} from '../constants';

class Product {
  @prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: PRODUCT_NAME_LENGTH.MIN,
    maxlength: PRODUCT_NAME_LENGTH.MAX,
  })
  public name!: string;

  @prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: PRODUCT_CODE_LENGTH.MIN,
    maxlength: PRODUCT_CODE_LENGTH.MAX,
  })
  public code!: string;

  @prop({
    type: Number,
    required: true,
    default: 0,
  })
  public totalRevenue!: number;

  @prop({
    type: Number,
    required: true,
    min: PRODUCT_TOTAL_SALES_MIN,
    default: 0,
  })
  public totalSales!: number;
}

const ProductModel = getModelForClass(Product, {
  schemaOptions: { timestamps: true },
});

type ProductDocument = HydratedDocument<Product>;

export { Product, ProductModel, ProductDocument };
