import { IPublicityAnnouncement, IShopOffer, IShopStore } from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { InjectionKey, ref } from 'vue';
/**
 * @class AppInjectable
 */
class AppInjectable {
  private _drawerLeft = ref(false);
  private _homeAnn = ref<IPublicityAnnouncement[]>([]);
  private _homeOffers = ref<IShopOffer[]>([]);
  private _homeStores = ref<IShopStore[]>([]);
  /**
   * -----------------------------------------
   *	Getters & Setters
   * -----------------------------------------
   */
  /**
   * Gets & Sets Drawer Left
   */
  get drawerLeft() {
    return this._drawerLeft.value;
  }
  set drawerLeft(drawer: boolean) {
    this._drawerLeft.value = drawer;
  }
  get homeAnn() {
    return this._homeAnn.value;
  }
  set homeAnn(ann: IPublicityAnnouncement[]) {
    this._homeAnn.value = ann;
  }
  get homeOffers() {
    return this._homeOffers.value;
  }
  set homeOffers(offers: IShopOffer[]) {
    this._homeOffers.value = offers;
  }
  get homeStores() {
    return this._homeStores.value;
  }
  set homeStores(s: IShopStore[]) {
    this._homeStores.value = s;
  }
  /**
   * -----------------------------------------
   *	Mutators
   * -----------------------------------------
   */
  /**
   * toggleDrawerLeft
   */
  toggleDrawerLeft() {
    this.drawerLeft = !this.drawerLeft;
  }
  /**
   * -----------------------------------------
   *	Actions
   * -----------------------------------------
   */

  /**
   * loadAnnouncements
   */
  async loadAnnouncements() {
    try {
      const resp = await $nairdaApi.PublicityAnnouncement.list();
      this.homeAnn = resp.data;
    } catch (error) {
      throw error;
    }
  }
  /**
   * loadOffers
   */
  async loadOffers() {
    try {
      const resp = await $nairdaApi.ShopOffer.filter({ limit: 10 });
      this.homeOffers = resp.data;
      return;
    } catch (error) {
      throw error;
    }
  }
  /**
   * loadStores
   */
  async loadStores() {
    try {
      const resp = await $nairdaApi.ShopStore.filter({ limit: 10 });
      this.homeStores = resp.data;
    } catch (error) {
      throw error;
    }
  }
}

export const $app = new AppInjectable();
export const _app: InjectionKey<AppInjectable> = Symbol('AppInjectable');
