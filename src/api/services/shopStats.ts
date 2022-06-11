import { AxiosInstance } from 'axios';
import { IShopStatsBasic } from '../types/shopStats';
/**
 * @const
 */
const BASE_URL = 'api/shop/stats';
/**
 * @class Shop Stats Service
 */
export class ShopStatsService {
  /**
   * Shop Stats Service Constructor
   * @param api AxiosInstance
   */
  constructor(private readonly api: AxiosInstance) {}
  /**
   * basic
   * @returns basic
   */
  async basic() {
    return this.api.get<IShopStatsBasic>(BASE_URL);
  }
}
