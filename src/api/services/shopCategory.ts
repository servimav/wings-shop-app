import { AxiosInstance } from 'axios';

import { IShopCategory } from '../types/shopCategory';
/**
 * ShopCategoryService
 */
export class ShopCategoryService {
  constructor(private readonly api: AxiosInstance) {}
  /**
   * List all
   * @returns
   */
  async all() {
    return this.api.get<IShopCategory[]>('api/shop/categories');
  }
  /**
   * List available
   * @param type
   * @returns
   */
  async available(type: 'stores' | 'offers' = 'offers') {
    return this.api.get<IShopCategory[]>(`api/shop/categories/${type}`);
  }
  /**
   * find
   * @param p
   * @returns
   */
  async find(p: { tag?: string; id?: number }) {
    return this.api.get<IShopCategory>('api/shop/categories/find', {
      params: p,
    });
  }
}
