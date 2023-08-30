import { MONGO_SORT } from '../constants';

export interface IMongoId {
  _id: string;
}

export interface IMongoSort {
  sort?: MONGO_SORT;
}

export interface IResultResponse {
  result: boolean;
}
