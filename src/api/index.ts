import { AxiosInstance } from 'axios';

import { csrfToken } from './services/csrf';
import { MapLocalityService } from './services/mapLocality';
import { PublicityAnnouncementService } from './services/publicity';
import { ShopService } from './services/shop';
import { ShopCategoryService } from './services/shopCategory';
import { ShopOfferService } from './services/shopOffer';
import { ShopOrderService } from './services/shopOrder';
import { ShopStatsService } from './services/shopStats';
import { ShopStoreService } from './services/shopStore';
import { UserServices } from './services/user';
/**
 * ServimavApi
 * @param api AxiosInstance
 */
export default function ServimavApi(api: AxiosInstance) {
  /**
   * CsrfToken
   */
  const CsrfToken = csrfToken(api);
  /**
   * MapLocality
   */
  const MapLocality = new MapLocalityService(api);
  /**
   * Publicity Announcement
   */
  const PublicityAnnouncement = new PublicityAnnouncementService(api);
  /**
   * Shop
   */
  const Shop = new ShopService(api);
  /**
   * ShopCategory
   */
  const ShopCategory = new ShopCategoryService(api);
  /**
   * ShopOrder
   */
  const ShopOrder = new ShopOrderService(api);
  /**
   * ShopOffer
   */
  const ShopOffer = new ShopOfferService(api);
  /**
   * ShopStats
   */
  const ShopStats = new ShopStatsService(api);
  /**
   * Shop Store Service
   */
  const ShopStore = new ShopStoreService(api);
  /**
   * UserServices Instance
   */
  const User = new UserServices(api);

  return {
    CsrfToken,
    MapLocality,
    PublicityAnnouncement,
    Shop,
    ShopCategory,
    ShopOffer,
    ShopOrder,
    ShopStats,
    ShopStore,
    User,
  };
}

/**
 * -----------------------------------------
 *	Export individual services
 * -----------------------------------------
 */
export * from './services/csrf';
export * from './services/mapLocality';
export * from './services/publicity';
export * from './services/shop';
export * from './services/shopOrder';
export * from './services/shopOffer';
export * from './services/shopStats';
export * from './services/shopStore';
export * from './services/user';

/**
 * -----------------------------------------
 *	Export Types
 * -----------------------------------------
 */

export * from './types/image';
export * from './types/mapLocality';
export * from './types/mapPosition';
export * from './types/publicity';
export * from './types/responses';
export * from './types/shopOffer';
export * from './types/shopOrder';
export * from './types/shopStats';
export * from './types/shopStore';
export * from './types/user';
