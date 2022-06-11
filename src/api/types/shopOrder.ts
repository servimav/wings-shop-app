import { IMapCoordinate } from './mapPosition';
import { IShopOffer } from './shopOffer';
import { IShopStore } from './shopStore';
import { IUserProfile } from './user';
/**
 * Shop Order Offer
 */
export interface IShopOrderOffer {
  qty: number;
  offer_id?: number;
  offer?: IShopOffer;
}
/**
 * Shop Order Status
 */
export type IShopOrderStatus =
  | 'PROCESSING'
  | 'ACCEPTED'
  | 'COMPLETED'
  | 'CANCELED'
  | 'ABORTED';
/**
 * Shop Order
 */
export interface IShopOrder {
  id: number;
  offers_price: number;
  service_price: number;
  shipping_price: number;
  shipping_address: string;
  shipping_coordinate: IMapCoordinate;
  shipping_time: string;
  status: IShopOrderStatus;
  order_offers: IShopOrderOffer[];
  // Optionals
  customer?: IUserProfile;
  message?: string;
  store?: IShopStore;
}
/**
 * Shop Order Prices
 */
export interface IShopOrderPrices {
  shipping_price: number;
  service_price: number;
  offers_price: number;
}

/**
 * -----------------------------------------
 *	HTTP
 * -----------------------------------------
 */
/**
 * Shop Order Price Request
 */
export interface IShopOrderPriceRequest {
  store_id: number;
  order_offers: Array<IShopOrderOffer>;
  shipping_coordinate: IMapCoordinate;
}
/**
 * Shop Order Create Request
 */
export interface IShopOrderCreateRequest {
  store_id: number;
  order_offers: Array<IShopOrderOffer>;
  shipping_address: string;
  shipping_coordinate: IMapCoordinate;
  shipping_time: string;
  message?: string;
}
/**
 * Shop Order Update Request
 */
export interface IShopOrderUpdateRequest {
  shipping_time?: string;
  status?: IShopOrderStatus;
}
