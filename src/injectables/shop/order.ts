import {
  IShopOrder,
  IShopOrderCreateRequest,
  IShopOrderPriceRequest,
  IShopOrderPrices,
} from 'src/api';
import { $servimavApi } from 'src/boot/axios';
import { $capacitor, notificationHelper } from 'src/helpers';
import { InjectionKey, ref } from 'vue';
import { $shopCartInjectable } from './cart';

const STORAGE_KEY = 'capacitor/shopOrders';
/**
 * OrderInjectable
 */
class OrderInjectable {
  private _myOrders = ref<IShopOrder[]>([]);
  private _order_prices = ref<IShopOrderPrices>({
    offers_price: 0,
    service_price: 0,
    shipping_price: 0,
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
    this.save();
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
    const resp = (await $servimavApi.ShopOrder.prices(param)).data;
    this.order_price = resp;
  }
  /**
   * create
   * @param order
   */
  async create(order: IShopOrderCreateRequest) {
    const resp = await $servimavApi.ShopOrder.create(order);
    this.myOrders.push(resp.data);
    this.order_price = {
      offers_price: 0,
      service_price: 0,
      shipping_price: 0,
    };
    $shopCartInjectable.order_offers = [];
  }
  /**
   * list
   */
  async list() {
    try {
      const resp = await $servimavApi.ShopOrder.list();
      this.myOrders = resp.data;
    } catch (error) {
      notificationHelper.axiosError(error, 'No pudimos encontrar ordenes');
    }
  }

  /**
   * load
   */
  async load() {
    try {
      const data = await $capacitor.Storage_load<IShopOrder[]>(STORAGE_KEY);
      if (data) {
        this.myOrders = data;
      }
    } catch (error) {
      console.log(STORAGE_KEY, error);
    }
  }
  /**
   * save
   */
  async save() {
    try {
      await $capacitor.Storage_save<IShopOrder[]>(STORAGE_KEY, this.myOrders);
    } catch (error) {
      console.log(STORAGE_KEY, error);
    }
  }
}

export const $shopOrderInjectable = new OrderInjectable();
export const _shopOrder: InjectionKey<OrderInjectable> =
  Symbol('OrderInjectable');
