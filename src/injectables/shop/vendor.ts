import {
  IShopOrder,
  IShopOrderStatus,
  IShopStore,
  IShopStoreCreateRequest,
  IShopStoreUpdateRequest,
} from 'src/api';
import { $servimavApi } from 'src/boot/axios';
import { InjectionKey, ref } from 'vue';

/**
 * Vendor Injectable
 */
class VendorInjectable {
  private _orders = ref<IShopOrder[]>([]);
  private _stores = ref<IShopStore[]>([]);
  /**
   * -----------------------------------------
   *	Getters & Setters
   * -----------------------------------------
   */
  get orders() {
    return this._orders.value;
  }
  set orders(o: IShopOrder[]) {
    this._orders.value = o;
  }
  get ordersAborted() {
    return this.orders.filter((_o) => _o.status === 'ABORTED');
  }
  get ordersAccepted() {
    return this.orders.filter((_o) => _o.status === 'ACCEPTED');
  }
  get ordersCanceled() {
    return this.orders.filter((_o) => _o.status === 'CANCELED');
  }
  get ordersCompleted() {
    return this.orders.filter((_o) => _o.status === 'COMPLETED');
  }
  get ordersOnProccess() {
    return this.orders.filter((_o) => _o.status === 'PROCESSING');
  }
  get stores() {
    return this._stores.value;
  }
  set stores(s: IShopStore[]) {
    this._stores.value = s;
  }
  /**
   * -----------------------------------------
   *	Actions
   * -----------------------------------------
   */
  /**
   * Create Store
   * @param s
   * @returns
   */
  async createStore(s: IShopStoreCreateRequest) {
    const resp = await $servimavApi.ShopStore.create(s);
    this.stores.push(resp.data);
    return resp.data;
  }
  /**
   * List Orders
   * @returns
   */
  async listOrders() {
    this.orders = [];
    this.stores.forEach(async (s) => {
      this.orders.push(
        ...(await $servimavApi.ShopOrder.listByStore(s.id)).data.data
      );
    });
    return this.orders;
  }
  /**
   * List Stores
   * @returns
   */
  async listStores() {
    this.stores = (await $servimavApi.ShopStore.list(true)).data.data;
    return this.stores;
  }
  /**
   * Remove Store
   * @param storeId
   */
  async removeStore(storeId: number) {
    await $servimavApi.ShopStore.destroy(storeId);
    const index = this.stores.findIndex((s) => s.id === storeId);
    if (index >= 0) this.stores.splice(index, 1);
  }
  /**
   * updateStore
   * @param storeId
   * @param update
   * @returns
   */
  async updateStore(storeId: number, update: IShopStoreUpdateRequest) {
    const resp = await $servimavApi.ShopStore.update(storeId, update);
    this._updateOrInsertStore(resp.data);
    return resp.data;
  }
  /**
   * Update Order
   * @param orderId
   * @param status
   */
  async updateOrder(orderId: number, status: IShopOrderStatus) {
    const resp = await $servimavApi.ShopOrder.updateStatus(orderId, { status });
    this._updateOrInsertOrder(resp.data);
    return resp.data;
  }
  /**
   * -----------------------------------------
   *	Helpers
   * -----------------------------------------
   */
  /**
   * Update Or Insert Order
   * @param order
   * @returns
   */
  private _updateOrInsertOrder(order: IShopOrder) {
    const index = this.orders.findIndex((s) => s.id === order.id);
    if (index >= 0) this.orders[index] = order;
    else this.orders.unshift(order);
    return this.orders;
  }
  /**
   * Update Or Insert Store
   * @param store
   * @returns
   */
  private _updateOrInsertStore(store: IShopStore) {
    const index = this.stores.findIndex((s) => s.id === store.id);
    if (index >= 0) this.stores[index] = store;
    else this.stores.push(store);
    return this.stores;
  }
}

export const $vendorInjectable = new VendorInjectable();
export const _vendorInjectable: InjectionKey<VendorInjectable> =
  Symbol('VendorInjectable');
