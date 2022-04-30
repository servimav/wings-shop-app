import { IImage } from './image';
import { IShopCategory } from './shopCategory';

export type IShopOfferType = 'PRODUCT' | 'SERVICE';
export type IShopOfferStockType = 'INFINITY' | 'LIMITED' | 'SOLD_OUT';
/**
 * @type IShopOffer
 */
export interface IShopOffer {
  id: number;
  title: string;
  description: string;
  type: IShopOfferType;
  stock_type: IShopOfferStockType;
  stock_qty: number;
  sell_price: number;
  vendor_price?: number;
  rating: number;
  image: IImage;
  category?: IShopCategory;
}

/**
 * -----------------------------------------
 *	HTTTP
 * -----------------------------------------
 */
/**
 * IShopOfferCreateRequest
 */
export type IShopOfferCreateRequest = {
  readonly title: string;
  readonly description: string;
  readonly type: IShopOfferType;
  readonly stock_type: IShopOfferStockType;
  readonly stock_qty: number;
  readonly sell_price: number;
  readonly vendor_price: number;
  readonly store_id: number;
};
/**
 * IShopOfferFilterrequest
 */
export interface IShopOfferFilterrequest {
  where?: {
    type?: IShopOfferType;
    stock_type?: IShopOfferStockType;
    title?: string;
    description?: string;
    price_lt?: number;
    price_gt?: number;
    price_et?: number;
  };
  limit?: number;
}
/**
 * IShopOfferUpdateRequest
 */
export type IShopOfferUpdateRequest = Omit<
  Partial<IShopOffer>,
  'id' | 'rating'
> & { onsale: boolean };
