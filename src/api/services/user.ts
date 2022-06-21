import { AxiosInstance } from 'axios';

import {
  IUserAuthLoginRequest,
  IUserAuthRegisterRequest,
  IUserAuthResponse,
  IUserProfile,
  IUserRoleRequest,
  IUserRoleRequestResponse,
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
   * send profile
   * @param message
   */
  async message(message: string) {
    await csrfToken(this.api);
    return this.api.post('/api/users/message', { message });
  }
  /**
   * get profile
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
   * request role
   * @param params
   * @returns
   */
  async roleRequest(params: IUserRoleRequest) {
    await csrfToken(this.api);
    return this.api.post<IUserRoleRequestResponse>(
      'api/users/role-request',
      params
    );
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
