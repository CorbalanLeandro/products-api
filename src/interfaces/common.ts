import { MONGO_SORT } from '../constants';

export interface IMongoIdParam {
  id: string;
}

export interface IMongoSortQuery {
  sort?: MONGO_SORT;
}
