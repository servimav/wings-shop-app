import { AxiosInstance } from 'axios';

import { Paginated } from '..';
import {
  IShopOrder,
  IShopOrderCreateRequest,
  IShopOrderUpdateRequest,
} from '../types/shopOrder';
import { csrfToken } from './csrf';
/**
 * ShopOrderService
 */
export class ShopOrderService {
  /**
   * ShopOrderService Constructor
   * @param api AxiosInstance
   */
  constructor(private readonly api: AxiosInstance) {}
  /**
   * create
   * @param create IShopOrderCreateRequest
   */
  async create(create: IShopOrderCreateRequest) {
    await csrfToken(this.api);
    return this.api.post<IShopOrder>('/api/shop/orders', create);
  }
  /**
   * createMass
   * @param mass
   * @returns
   */
  async createMass(mass: Omit<IShopOrderCreateRequest, 'store_id'>) {
    await csrfToken(this.api);
    return this.api.post<IShopOrder[]>('/api/shop/orders/mass', mass);
  }
  /**
   * destroy
   * @param orderId number
   */
  async destroy(orderId: number) {
    await csrfToken(this.api);
    return this.api.delete<boolean>(`/api/shop/orders/${orderId}`);
  }
  /**
   * find
   * @param orderId number
   */
  async find(orderId: number) {
    return this.api.get<IShopOrder>(`/api/shop/orders/${orderId}`);
  }
  /**
   * list
   */
  async list() {
    return this.api.get<IShopOrder[]>('/api/shop/orders');
  }
  /**
   * listByStore
   * @param storeId number
   */
  async listByStore(storeId: number) {
    return this.api.get<Paginated<IShopOrder>>(
      `/api/shop/orders/store/${storeId}`
    );
  }
  /**
   * update
   * @param id number
   * @param update Partial<IShopOrder>
   */
  async updateStatus(id: number, update: IShopOrderUpdateRequest) {
    await csrfToken(this.api);
    return this.api.patch<IShopOrder>(`/api/shop/orders/${id}/status`, update);
  }
}
