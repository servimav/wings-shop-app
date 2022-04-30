import { AxiosInstance } from 'axios';

import {
  IUserAuthLoginRequest,
  IUserAuthRegisterRequest,
  IUserAuthResponse,
  IUserProfile,
} from '../types/user';

import { csrfToken } from './csrf';
/**
 * @class UserServices
 */
export class UserServices {
  /**
   * constructor
   * @param api AxiosInstance
   */
  constructor(private readonly api: AxiosInstance) {}
  /**
   * login
   * @param credentials
   */
  async login(credentials: IUserAuthLoginRequest) {
    await csrfToken(this.api);
    return this.api.post<IUserAuthResponse>('/api/users/login', credentials);
  }
  /**
   * profile
   */
  async profile() {
    return this.api.get<IUserProfile>('/api/users/profile');
  }
  /**
   * register
   * @param profile IUserAuthRegisterRequest
   */
  async register(profile: IUserAuthRegisterRequest) {
    await csrfToken(this.api);
    return this.api.post<IUserAuthResponse>('/api/users/register', profile);
  }
  /**
   * update
   * @param update
   * @returns
   */
  async update(update: Partial<IUserProfile>) {
    await csrfToken(this.api);
    return this.api.post<IUserProfile>('/api/users', update, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
