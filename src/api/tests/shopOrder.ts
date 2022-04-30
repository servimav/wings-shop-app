import { AxiosInstance } from 'axios';

import { ShopOrderService } from '../services/shopOrder';

/**
 * ShopOrderTests
 * @param api
 */
export function ShopOrderTests(api: AxiosInstance) {
  /**
   * service
   */
  const $service = new ShopOrderService(api);
  /**
   * create
   */
  async function create() {
    try {
      console.log(
        'Success ShopOrder create',
        (
          await $service.create({
            store_id: 1,
            shipping_address: 'address',
            shipping_coordinate: {
              lat: 0,
              lng: 0,
            },
            shipping_time: '2022-03-22 12:00:00',
            order_offers: [
              {
                offer_id: 1,
                qty: 1,
              },
            ],
          })
        ).data
      );
    } catch (error) {
      console.log('Error ShopOrder create', error);
    }
  }
  /**
   * updateStatus
   */
  async function updateStatus() {
    try {
      console.log(
        'Success ShopOrder update',
        (
          await $service.updateStatus(1, {
            shipping_time: '2022-03-22 12:00:00',
            status: 'ACCEPTED',
          })
        ).data
      );
    } catch (error) {
      console.log('Error ShopOrder update', error);
    }
  }

  return {
    create,
    updateStatus,
  };
}
