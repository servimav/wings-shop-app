import { IMapCoordinate } from './mapPosition';
import { IShopOffer } from './shopOffer';
import { IShopStore } from './shopStore';
import { IUserProfile } from './user';
/**
 * IShopOrderOffer
 */
export interface IShopOrderOffer {
  qty: number;
  offer_id?: number;
  offer?: IShopOffer;
}
/**
 * IShopOrderStatus
 */
export type IShopOrderStatus =
  | 'PROCESSING'
  | 'ACCEPTED'
  | 'COMPLETED'
  | 'CANCELED'
  | 'ABORTED';
/**
 * IShopOrder
 */
export interface IShopOrder {
  id: number;
  total_price: number;
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
 * -----------------------------------------
 *	HTTP
 * -----------------------------------------
 */
/**
 * IShopOrderCreateRequest
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
 * IShopOrderUpdateRequest
 */
export interface IShopOrderUpdateRequest {
  shipping_time?: string;
  status?: IShopOrderStatus;
}
