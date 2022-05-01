import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import NairdaApi from 'src/api';
import { $user } from 'src/injectables';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}
export const baseURL = process.env.DEV
  ? 'http://localhost:8000'
  : 'https://srv.net';

const $api = axios.create({
  baseURL: `${baseURL}`,
  timeout: 30000,
  timeoutErrorMessage: 'Error en la red',
  withCredentials: true,
});

export default boot(({ app }) => {
  /**
   * Api request Interceptor
   */
  $api.interceptors.request.use((_request) => {
    /* Append content type header if its not present */
    if (!(_request.headers as AxiosRequestHeaders)['Content-Type']) {
      (_request.headers as AxiosRequestHeaders)['Content-Type'] =
        'application/json';
    }

    /* Check if authorization is set */
    if (!(_request.headers as AxiosRequestHeaders)['Authorization']) {
      /* Check if the user is authenticated to send Bearer token */
      const token = $user.apiToken;
      if (token && token.length > 0) {
        (_request.headers as AxiosRequestHeaders).Authorization =
          'Bearer ' + token;
      } else {
        /* Send the application authentication as Bearer token */
        (_request.headers as AxiosRequestHeaders).Authorization =
          'Bearer ApiToken';
      }
    }
    /* Check if app header is set */
    if (!(_request.headers as AxiosRequestHeaders)['Nairda-Token']) {
      (_request.headers as AxiosRequestHeaders)['Nairda-Token'] =
        '1|$2y$10$G1.nEO.oRi5nrVSpZFAhguSARzeNgcLoDvg.DgnWZKYMYphooKlUW';
    }
    return _request;
  });

  app.config.globalProperties.$axios = axios;

  app.config.globalProperties.$api = $api;
});

const $nairdaApi = NairdaApi($api);

export { $api, $nairdaApi };
