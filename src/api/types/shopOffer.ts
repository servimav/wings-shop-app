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
  store_id: number;
  category?: IShopCategory;
  onsale: boolean;
}

/**
 * -----------------------------------------
 *	HTTTP
 * -----------------------------------------
 */
/**
 * IShopOfferCreateRequest
 */
export interface IShopOfferCreateRequest {
  title: string;
  description: string;
  type: IShopOfferType;
  stock_type: IShopOfferStockType;
  stock_qty: number;
  sell_price: number;
  vendor_price: number;
  store_id: number;
  category_tag: string;
  image: string;
}
/**
 * IShopOfferFilterrequest
 */
export interface IShopOfferFilterrequest {
  type?: IShopOfferType;
  stock_type?: IShopOfferStockType;
  title?: string;
  description?: string;
  price_lt?: number;
  price_gt?: number;
  price_et?: number;
  locality_id?: number;
  limit?: number;
}
/**
 * IShopOfferUpdateRequest
 */
export type IShopOfferUpdateRequest = Omit<
  Partial<IShopOffer>,
  'id' | 'rating'
> & { category_tag: string };
