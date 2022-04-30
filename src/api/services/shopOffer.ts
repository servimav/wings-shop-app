import { AxiosInstance, AxiosResponse } from 'axios';

import { Paginated } from '../types/responses';
import {
  IShopOffer,
  IShopOfferCreateRequest,
  IShopOfferFilterrequest,
  IShopOfferUpdateRequest,
} from '../types/shopOffer';
import { csrfToken } from './csrf';

/**
 * ShopOfferService
 */
export class ShopOfferService {
  /**
   * ShopOfferService Constructor
   * @param api AxiosInstance
   */
  constructor(private readonly api: AxiosInstance) {}
  /**
   * create
   * @param createRequest IShopOfferCreateRequest
   */
  async create(createRequest: IShopOfferCreateRequest) {
    await csrfToken(this.api);
    return this.api.post<IShopOffer>('/api/shop/offers', createRequest);
  }
  /**
   * destroy
   * @param offerId number
   */
  async destroy(offerId: number) {
    await csrfToken(this.api);
    return this.api.delete<boolean>(`/api/shop/offers/${offerId}`);
  }
  /**
   * filter
   * @param params
   * @returns
   */
  async filter(params: IShopOfferFilterrequest) {
    return this.api.get<IShopOffer[]>('/api/shop/offers/filter', { params });
  }
  /**
   * find
   * @param offerId number
   */
  async find(offerId: number) {
    return this.api.get<IShopOffer>(`/api/shop/offers/${offerId}`);
  }
  /**
   * list
   */
  async list() {
    return this.api.get<Paginated<IShopOffer>>('/api/shop/offers');
  }
  /**
   * update
   * @param offerId number
   * @param update Partial<IShopOffer>
   */
  async update(offerId: number, update: IShopOfferUpdateRequest) {
    await csrfToken(this.api);
    return this.api.patch<IShopOffer, AxiosResponse<IShopOffer>>(
      `/api/shop/offers/${offerId}`,
      update
    );
  }
}
