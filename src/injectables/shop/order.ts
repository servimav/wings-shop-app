import { IShopOrder, IShopOrderCreateRequest } from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { $router } from 'src/boot/router';
import { notificationHelper } from 'src/helpers';
import { ROUTE_NAME } from 'src/router';
import { InjectionKey, ref } from 'vue';
import { $shopCartInjectable } from './cart';
/**
 * OrderInjectable
 */
class OrderInjectable {
  private _myOrders = ref<IShopOrder[]>([]);

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
  /**
   * -----------------------------------------
   *	Methods
   * -----------------------------------------
   */
  /**
   * -----------------------------------------
   *	Actions
   * -----------------------------------------
   */

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
  /**
   * createMassAction
   * @param order
   */
  async createMassAction(order: Omit<IShopOrderCreateRequest, 'store_id'>) {
    try {
      const resp = await $nairdaApi.ShopOrder.createMass(order);
      this.myOrders.push(...resp.data);
      $shopCartInjectable.order_offers = [];
      notificationHelper.success(['Su orden ha sido guardada']);
      void $router.push({ name: ROUTE_NAME.HOME });
    } catch (error) {
      notificationHelper.axiosError(error, 'No se pudo crear la orden');
    }
  }
}

export const $shopOrderInjectable = new OrderInjectable();
export const _shopOrder: InjectionKey<OrderInjectable> =
  Symbol('OrderInjectable');
