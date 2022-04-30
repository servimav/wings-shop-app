import { AxiosInstance } from 'axios';
/**
 * csrfToken
 * @param api AxiosInstance
 * @returns AxiosPromise
 */
export async function csrfToken(api: AxiosInstance) {
  return api.get<void>('/sanctum/csrf-cookie');
}