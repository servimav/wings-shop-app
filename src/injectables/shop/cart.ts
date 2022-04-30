import { IShopOffer, IShopOrderOffer } from 'src/api';
import { InjectionKey, ref } from 'vue';
/**
 * ShopCartInjectable
 */
class ShopCartInjectable {
  private _order_offers = ref<IShopOrderOffer[]>([]);

  /**
   * -----------------------------------------
   *	Getters & Setters
   * -----------------------------------------
   */
  get order_offers() {
    return this._order_offers.value;
  }
  set order_offers(of: IShopOrderOffer[]) {
    this._order_offers.value = of;
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
}

export const $shopCartInjectable = new ShopCartInjectable();
export const _shopCart: InjectionKey<ShopCartInjectable> =
  Symbol('ShopCartInjectable');
