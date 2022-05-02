import {
  IPublicityAnnouncement,
  IShopOffer,
  IShopStore,
  IUserRoleName,
} from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { $capacitor } from 'src/helpers';
import { InjectionKey, ref } from 'vue';
/**
 * @const STORAGE_KEY
 */
const STORAGE_KEY = 'Injectable/App';
/**
 * @interface IAppStorage
 */
interface IAppStorage {
  mode: IUserRoleName;
}
/**
 * @class AppInjectable
 */
class AppInjectable {
  private _mode = ref<IUserRoleName>('user');
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
  get mode() {
    return this._mode.value;
  }
  set mode(mode: IUserRoleName) {
    this._mode.value = mode;
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
  /**
   * -----------------------------------------
   *	Methods
   * -----------------------------------------
   */
  /**
   * load
   */
  async load() {
    try {
      const data = await $capacitor.Storage_load<IAppStorage>(STORAGE_KEY);
      if (data) {
        this.mode = data.mode;
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
      await $capacitor.Storage_save<IAppStorage>(STORAGE_KEY, {
        mode: this.mode,
      });
    } catch (error) {
      console.log(STORAGE_KEY, error);
    }
  }
}

export const $app = new AppInjectable();
export const _app: InjectionKey<AppInjectable> = Symbol('AppInjectable');
