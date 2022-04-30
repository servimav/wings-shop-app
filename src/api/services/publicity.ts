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
  private API_PATH = 'api/publicity/announcements';
  /**
   * constructor
   * @param api
   */
  constructor(private readonly api: AxiosInstance) {}
  /**
   * create
   * @param create
   * @returns
   */
  async create(create: IPublicityAnnouncementCreateRequest) {
    await csrfToken(this.api);
    return this.api.post<IPublicityAnnouncement>(this.API_PATH, create);
  }
  /**
   * find
   * @param id
   * @returns
   */
  async find(id: number) {
    return this.api.get<IPublicityAnnouncement>(`${this.API_PATH}/${id}`);
  }
  /**
   * list
   * @returns
   */
  async list() {
    return this.api.get<IPublicityAnnouncement[]>(this.API_PATH);
  }
  /**
   * remove
   * @param id
   * @returns
   */
  async remove(id: number) {
    await csrfToken(this.api);
    return this.api.delete(`${this.API_PATH}/${id}`);
  }
  /**
   * update
   * @param ann
   * @returns
   */
  async update(ann: IPublicityAnnouncementUpdateRequest) {
    await csrfToken(this.api);
    return this.api.patch<IPublicityAnnouncement>(`${this.API_PATH}/${ann.id}`);
  }
}
