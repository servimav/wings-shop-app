import { IMapCoordinate } from './mapPosition';
import { IShopCategory } from './shopCategory';
import { IShopOffer } from './shopOffer';

/**
 * @type IShopStore
 */
export interface IShopStore {
  id: number;
  title: string;
  description?: string;
  image: string;
  map_address?: string;
  map_coordinate?: IMapCoordinate;
  rating: number;
  category?: IShopCategory;
  offers?: IShopOffer[];
}

/**
 * -----------------------------------------
 *	HTTP
 * -----------------------------------------
 */

/**
 * @type IShopStoreCreateRequest
 */
export type IShopStoreCreateRequest = {
  readonly title: string;
  readonly description: string;
  readonly map_position: IMapCoordinate;
  readonly open?: boolean;
};
/**
 * IShopStoreFilter
 */
export interface IShopStoreFilterRequest {
  where?: {
    open?: boolean;
    title?: string;
    description?: string;
  };
  limit?: number;
}
/**
 * @type IShopStoreUpdateRequest
 */
export type IShopStoreUpdateRequest = Partial<IShopStoreCreateRequest>;
