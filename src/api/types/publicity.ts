import { IShopOffer } from './shopOffer';
import { IShopStore } from './shopStore';
import { IUserProfile } from './user';
/**
 * IPublicityAnnouncement
 */
export interface IPublicityAnnouncement {
  id: number;
  title: string;
  subtitle?: string;
  text?: string;
  image?: string;
  related?: {
    type: 'ShopOffer' | 'ShopStore';
    model?: IShopOffer | IShopStore;
    id?: number;
  };
  user: IUserProfile;
  active: boolean;
  created_at: string;
}
/**
 * IPublicityAnnouncementCreateRequest
 */
export type IPublicityAnnouncementCreateRequest = Omit<
  IPublicityAnnouncement,
  'id' | 'created_at' | 'user' | 'active'
>;
/**
 * IPublicityAnnouncementUpdateRequest
 */
export type IPublicityAnnouncementUpdateRequest = Partial<
  Omit<IPublicityAnnouncement, 'created_at' | 'user'>
>;
