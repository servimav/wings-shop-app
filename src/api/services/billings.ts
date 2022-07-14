import { AxiosInstance } from 'axios';
import { IBilling } from '../types/billings';

const API_URl = 'api/billings';
/**
 * Billings Service
 */
export class BillingsService {
  constructor(private readonly api: AxiosInstance) {}
  /**
   * index
   * @returns
   */
  async index() {
    return this.api.get<IBilling[]>(API_URl);
  }
}
