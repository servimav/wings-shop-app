import { IShopOffer, IShopOrderOffer } from 'src/api';
import { InjectionKey, ref } from 'vue';
/**
 * ShopCartInjectable
 */
class ShopCartInjectable {
  private _activeStore = ref(0);
  private _order_offers = ref<IShopOrderOffer[]>([]);

  /**
   * -----------------------------------------
   *	Getters & Setters
   * -----------------------------------------
   */
  get active_store() {
    return this._activeStore.value;
  }
  set active_store(active: number) {
    this._activeStore.value = active;
  }
  get order_offers() {
    return this._order_offers.value;
  }
  set order_offers(of: IShopOrderOffer[]) {
    this._order_offers.value = of;
  }
  get offers_price() {
    let total = 0;
    this.order_offers.forEach((of) => {
      total += of.qty * Number(of.offer?.sell_price);
    });
    return total;
  }
  /**
   * -----------------------------------------
   *	Methods
   * -----------------------------------------
   */
  /**
   * addOrderOffer
   * @param offerId
   * @param qty
   */
  addOrderOffer(offer: IShopOffer, qty: number) {
    if (this.active_store !== 0 && offer.store_id !== this.active_store)
      return false;
    // if exists
    const index = this.order_offers.findIndex(
      (_of) => _of.offer_id === offer.id
    );
    if (index >= 0) {
      // Check offer stock
      if (
        offer.stock_type === 'INFINITY' ||
        (offer.stock_type === 'LIMITED' && offer.stock_qty >= qty)
      )
        this.order_offers[index].qty = qty;
    } else {
      this.order_offers.push({
        qty,
        offer_id: offer.id,
        offer,
      });
    }
    this.active_store = offer.store_id;
    return true;
  }
  /**
   * removeOrderOffer
   * @param offerId
   */
  removeOrderOffer(offerId: number) {
    const index = this.order_offers.findIndex(
      (_of) => _of.offer_id === offerId
    );
    if (index >= 0) this.order_offers.splice(index, 1);
  }
  /**
   * restartOrderOffers
   */
  restartOrderOffers() {
    this.active_store = 0;
    this.order_offers = [];
  }
}

export const $shopCartInjectable = new ShopCartInjectable();
export const _shopCart: InjectionKey<ShopCartInjectable> =
  Symbol('ShopCartInjectable');
