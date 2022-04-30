import { IShopOffer } from './shopOffer';
import { IShopStore } from './shopStore';

export interface IShopCategory {
  tag: string;
  title: string;
  description: string;
  parent_tag: string;
  icons: {
    mdi?: string;
  };
  stores?: IShopStore[];
  offers?: IShopOffer[];
}
/**
 * IShopCategoryWithChild
 */
export interface IShopCategoryWithChild extends IShopCategory {
  child: IShopCategory[];
}
