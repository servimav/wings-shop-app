import {
  IShopOrder,
  IShopOrderCreateRequest,
  IShopOrderPriceRequest,
  IShopOrderPrices,
} from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { InjectionKey, ref } from 'vue';
import { $shopCartInjectable } from './cart';
/**
 * OrderInjectable
 */
class OrderInjectable {
  private _myOrders = ref<IShopOrder[]>([]);
  private _order_prices = ref<IShopOrderPrices>({
    offers_price: 0,
    service_price: 0,
    total_price: 0,
  });

  /**
   * -----------------------------------------
   *	Getters & Setters
   * -----------------------------------------
   */
  get myOrders() {
    return this._myOrders.value;
  }
  set myOrders(orders: IShopOrder[]) {
    this._myOrders.value = orders;
  }
  get order_price() {
    return this._order_prices.value;
  }
  set order_price(prices: IShopOrderPrices) {
    this._order_prices.value = prices;
  }
  /**
   * -----------------------------------------
   *	Actions
   * -----------------------------------------
   */
  /**
   * calculatePrices
   * @param param
   */
  async calculatePrices(param: IShopOrderPriceRequest) {
    const resp = (await $nairdaApi.ShopOrder.prices(param)).data;
    this.order_price = resp;
  }
  /**
   * create
   * @param order
   */
  async create(order: IShopOrderCreateRequest) {
    const resp = await $nairdaApi.ShopOrder.create(order);
    this.myOrders.push(resp.data);
    this.order_price = {
      offers_price: 0,
      service_price: 0,
      total_price: 0,
    };
    $shopCartInjectable.order_offers = [];
  }
  /**
   * list
   */
  async list() {
    try {
      const resp = await $nairdaApi.ShopOrder.list();
      this.myOrders = resp.data;
    } catch (error) {
      notificationHelper.axiosError(error, 'No pudimos encontrar ordenes');
    }
  }
}

export const $shopOrderInjectable = new OrderInjectable();
export const _shopOrder: InjectionKey<OrderInjectable> =
  Symbol('OrderInjectable');
