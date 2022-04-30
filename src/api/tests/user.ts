import { AxiosInstance } from 'axios';

import { UserServices } from '../services/user';
/**
 * UserTest
 * @param api 
 */
export function UserTest(api: AxiosInstance) {
  const $user = new UserServices(api);
  /**
   * authLogin
   */
  async function authLogin() {
    try {
      console.log('Success User auth-login', (await $user.login({
        email: 'info@nairda.net',
        password: 'password',
        service_name: 'ApiTest',
        auth_mode: 'user'
      })).data);
    } catch (error) {
      console.log('Error User auth-login', error);
    }
  }
  /**
   * authRegister
   */
  async function authRegister() {
    try {
      console.log('Success User auth-register', (await $user.register({
        email: 'info2@nairda.net',
        password: 'password',
        password_confirmation: 'password',
        service_name: 'ApiTest',
        first_name: 'ApiTest',
        last_name: 'apiTest',
      })).data);
    } catch (error) {
      console.log('Error User auth-register', error);
    }
  }

  return {
    authLogin, authRegister
  }
}