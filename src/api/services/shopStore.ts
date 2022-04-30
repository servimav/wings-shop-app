import { AxiosInstance } from 'axios';

import { Paginated } from '../types/responses';
import {
  IShopStore,
  IShopStoreCreateRequest,
  IShopStoreFilterRequest,
  IShopStoreUpdateRequest,
} from '../types/shopStore';

import { csrfToken } from './csrf';
/**
 * ShopStoreService
 */
export class ShopStoreService {
  /**
   * ShopStoreService Constructor
   * @param api AxiosInstance
   */
  constructor(private readonly api: AxiosInstance) {}
  /**
   * create
   * @param create: IShopStoreCreateRequest
   * @returns AxiosPromise<IShopStore>
   */
  async create(create: IShopStoreCreateRequest) {
    await csrfToken(this.api);
    return this.api.post<IShopStore>('/api/shop/stores', create);
  }
  /**
   * destroy
   * @param storeId number
   * @returns AxiosPromise<boolean>
   */
  async destroy(storeId: number) {
    await csrfToken(this.api);
    return this.api.delete<boolean>(`/api/shop/stores/${storeId}`);
  }
  /**
   * filter
   * @param storeId number
   * @returns AxiosPromise<IShopStore>
   */
  async filter(params: IShopStoreFilterRequest) {
    return this.api.get<IShopStore[]>('/api/shop/stores/filter', { params });
  }
  /**
   * find
   * @param storeId number
   * @returns AxiosPromise<IShopStore>
   */
  async find(storeId: number, asVendor = false) {
    return asVendor
      ? this.api.get<IShopStore>(`/api/shop/stores/vendor/${storeId}`)
      : this.api.get<IShopStore>(`/api/shop/stores/${storeId}`);
  }
  /**
   * list
   * @returns AxiosPromise<Paginated<IShopStore>>
   */
  async list(asVendor = false) {
    return asVendor
      ? this.api.get<Paginated<IShopStore>>('/api/shop/stores/vendor')
      : this.api.get<Paginated<IShopStore>>('/api/shop/stores');
  }
  /**
   * update
   * @param storeId number
   * @param update IShopStoreUpdateRequest
   * @returns AxiosPromise<IShopStore>
   */
  async update(storeId: number, update: IShopStoreUpdateRequest) {
    await csrfToken(this.api);
    return this.api.patch(`/api/shop/stores/${storeId}`, update);
  }
}
