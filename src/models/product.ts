import { Schema, model } from 'mongoose';

import { IProduct } from '../interfaces';
import { PRODUCT_CODE_LENGTH, PRODUCT_NAME_LENGTH } from '../constants';

const ProductSchema = new Schema<IProduct>({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: PRODUCT_CODE_LENGTH.MIN,
    maxlength: PRODUCT_CODE_LENGTH.MAX,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: PRODUCT_NAME_LENGTH.MIN,
    maxlength: PRODUCT_NAME_LENGTH.MAX,
  },
  totalRevenue: {
    type: Number,
    required: true,
    default: 0,
  },
  totalSales: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
});

const PRODUCT_MODEL_NAME = 'Product';
export default model<IProduct>(PRODUCT_MODEL_NAME, ProductSchema);
