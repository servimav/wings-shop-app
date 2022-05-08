import {
  IMapLocality,
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
  locality: IMapLocality | undefined;
}
/**
 * @class AppInjectable
 */
class AppInjectable {
  private _allLocalities = ref<IMapLocality[]>([]);
  private _drawerLeft = ref(false);
  private _homeAnn = ref<IPublicityAnnouncement[]>([]);
  private _homeOffers = ref<IShopOffer[]>([]);
  private _homeStores = ref<IShopStore[]>([]);
  private _locality = ref<IMapLocality>();
  private _mode = ref<IUserRoleName>('user');

  /**
   * -----------------------------------------
   *	Getters & Setters
   * -----------------------------------------
   */
  /**
   * Gets & Sets All localities
   */
  get allLocalities() {
    return this._allLocalities.value;
  }
  set allLocalities(v: IMapLocality[]) {
    this._allLocalities.value = v;
  }
  /**
   * Gets & Sets Drawer Left
   */
  get drawerLeft() {
    return this._drawerLeft.value;
  }
  set drawerLeft(drawer: boolean) {
    this._drawerLeft.value = drawer;
  }
  /**
   * Gets & Sets Home announcements
   */
  get homeAnn() {
    return this._homeAnn.value;
  }
  set homeAnn(ann: IPublicityAnnouncement[]) {
    this._homeAnn.value = ann;
  }
  /**
   * Gets & Sets Home offers
   */
  get homeOffers() {
    return this._homeOffers.value;
  }
  set homeOffers(offers: IShopOffer[]) {
    this._homeOffers.value = offers;
  }
  /**
   * Gets & Sets Home stores
   */
  get homeStores() {
    return this._homeStores.value;
  }
  set homeStores(s: IShopStore[]) {
    this._homeStores.value = s;
  }
  /**
   * Gets & Sets locality
   */
  get locality() {
    return this._locality.value;
  }
  set locality(_l: IMapLocality | undefined) {
    this._locality.value = _l;
  }
  /**
   * Gets & Sets mode
   */
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
   * listLocalities
   */
  async listLocalities() {
    this.allLocalities = (await $nairdaApi.MapLocality.list()).data;
  }
  /**
   * loadAnnouncements
   */
  async loadAnnouncements() {
    const resp = await $nairdaApi.PublicityAnnouncement.list();
    this.homeAnn = resp.data;
    return resp.data;
  }
  /**
   * loadOffers
   */
  async loadOffers() {
    if (!this.locality) return;
    const resp = await $nairdaApi.ShopOffer.filter({
      limit: 10,
      locality_id: this.locality.id,
    });
    this.homeOffers = resp.data;
    return resp.data;
  }
  /**
   * loadStores
   */
  async loadStores() {
    if (!this.locality) return;
    const resp = await $nairdaApi.ShopStore.filter({
      limit: 10,
      locality_id: this.locality.id,
    });
    this.homeStores = resp.data;
    return resp.data;
  }
  /**
   * set app mode
   * @param mode
   */
  async setMode(mode: IUserRoleName) {
    this.mode = mode;
    await this.save();
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
        this.locality = data.locality;
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
        locality: this.locality,
      });
    } catch (error) {
      console.log(STORAGE_KEY, error);
    }
  }
}

export const $app = new AppInjectable();
export const _app: InjectionKey<AppInjectable> = Symbol('AppInjectable');
