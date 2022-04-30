import { AxiosInstance } from 'axios';
import { IShopOffer } from '../types/shopOffer';
import { IShopStore } from '../types/shopStore';
/**
 * IShopSearchRequest
 */
export interface IShopSearchRequest {
  type: 'ALL' | 'SHOP_STORE' | 'SHOP_OFFER';
  search: string;
}
/**
 * IShopSearchResponse
 */
export interface IShopSearchResponse {
  offers: IShopOffer[];
  stores: IShopStore[];
}

/**
 * ShopService
 */
export class ShopService {
  constructor(private readonly api: AxiosInstance) {}
  /**
   * search
   * @param search
   * @returns
   */
  async search(search: IShopSearchRequest) {
    return this.api.get<IShopSearchResponse>('api/shop/search', {
      params: search,
    });
  }
}
