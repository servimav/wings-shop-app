import { AxiosInstance } from 'axios';
import {
  IPublicityAnnouncement,
  IPublicityAnnouncementCreateRequest,
  IPublicityAnnouncementUpdateRequest,
} from '../types/publicity';
import { csrfToken } from './csrf';

/**
 * PublicityAnnouncementService
 */
export class PublicityAnnouncementService {
  /**
   * @var API_PATH
   */
  private API_PATH = 'api/publicity';
  /**
   * constructor
   * @param api
   */
  constructor(private readonly api: AxiosInstance) {}
  /**
   * Confirm Telegram Access Code
   * @param code
   * @returns
   */
  async confirmTelgramCode(code: string) {
    return await this.api.get(`${this.API_PATH}/telegram/access-code/1`, {
      params: { code },
    });
  }
  /**
   * create
   * @param create
   * @returns
   */
  async create(create: IPublicityAnnouncementCreateRequest) {
    await csrfToken(this.api);
    return this.api.post<IPublicityAnnouncement>(
      this.API_PATH + '/announcements',
      create
    );
  }
  /**
   * find
   * @param id
   * @returns
   */
  async find(id: number) {
    return this.api.get<IPublicityAnnouncement>(
      `${this.API_PATH + '/announcements'}/${id}`
    );
  }
  /**
   * list
   * @returns
   */
  async list() {
    return this.api.get<IPublicityAnnouncement[]>(
      this.API_PATH + '/announcements'
    );
  }
  /**
   * remove
   * @param id
   * @returns
   */
  async remove(id: number) {
    await csrfToken(this.api);
    return this.api.delete(`${this.API_PATH + '/announcements'}/${id}`);
  }
  /**
   * update
   * @param ann
   * @returns
   */
  async update(ann: IPublicityAnnouncementUpdateRequest) {
    await csrfToken(this.api);
    return this.api.patch<IPublicityAnnouncement>(
      `${this.API_PATH + '/announcements'}/${ann.id}`
    );
  }
}
