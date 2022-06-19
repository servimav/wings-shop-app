import { AxiosInstance } from 'axios';
import { IAppInfo } from '../types/application';

const API_URl = 'api/applications';
/**
 * ApplicationService
 */
export class ApplicationService {
  constructor(private readonly api: AxiosInstance) {}
  /**
   * whoami
   * @returns
   */
  async whoami() {
    return this.api.get<IAppInfo>(API_URl + '/whoami');
  }
  /**
   * Download Link
   * @param token
   * @returns
   */
  downloadLink(token: string) {
    return (
      this.api.defaults.baseURL + '/' + API_URl + `/download?token=${token}`
    );
  }
}
