import { AxiosInstance } from 'axios';

import { ShopOfferService } from '../services/shopOffer';

/**
 * ShopStoreTests
 * @param api 
 */
export function ShopOfferTests(api: AxiosInstance) {
  /**
   * service
   */
  const $service = new ShopOfferService(api);
  /**
   * create
   */
  async function create() {
    try {
      console.log('Success ShopOffer create', (await $service.create({
        title: 'TestTitle',
        description: 'TestDescription',
        sell_price: 100,
        store_id: 1,
        stock_qty: 10,
        stock_type: 'INFINITY',
        type: 'PRODUCT',
        vendor_price: 1
      })).data);
    } catch (error) {
      console.log('Error ShopOffer create', error);
    }
  }
  /**
   * update
   */
  async function update() {
    try {
      console.log('Success ShopOffer update', (await $service.update(1, {
        title: 'TestTitle',
        description: 'TestDescription',
        stock_type: 'LIMITED',
        stock_qty: 1,
        onsale: true
      })).data);
    } catch (error) {
      console.log('Error ShopOffer update', error);
    }
  }

  return {
    create, update
  }
}