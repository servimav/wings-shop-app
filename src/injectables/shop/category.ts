import { IShopCategory } from 'src/api/types/shopCategory';
import { $servimavApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { InjectionKey, ref } from 'vue';

class ShopCategoryInjectable {
  private _all = ref<IShopCategory[]>([]);
  private _available = ref<IShopCategory[]>([]);

  get all() {
    return this._all.value;
  }
  set all(cat: IShopCategory[]) {
    this._all.value = cat;
  }
  get available() {
    return this._available.value;
  }
  set available(cat: IShopCategory[]) {
    this._available.value = cat;
  }
  /**
   * -----------------------------------------
   *	Actions
   * -----------------------------------------
   */
  /**
   * allAction
   */
  async allAction() {
    try {
      const resp = await $servimavApi.ShopCategory.all();
      this.all = resp.data;
    } catch (error) {
      notificationHelper.axiosError(error);
    }
  }
  /**
   * allAction
   */
  async availableAction() {
    try {
      const resp = await $servimavApi.ShopCategory.available();
      this.available = resp.data;
    } catch (error) {
      notificationHelper.axiosError(error);
    }
  }
}

export const $shopCategory = new ShopCategoryInjectable();
export const _shopCategory: InjectionKey<ShopCategoryInjectable> = Symbol(
  'ShopCategoryInjectable'
);
