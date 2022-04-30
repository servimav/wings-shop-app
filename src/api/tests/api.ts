import axios, { AxiosRequestHeaders } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 30000,
  timeoutErrorMessage: 'Error en la red',
  withCredentials: true,
});

api.interceptors.request.use((_request) => {
  /* Append content type header if its not present */
  if (!(_request.headers as AxiosRequestHeaders)['Content-Type']) {
    (_request.headers as AxiosRequestHeaders)['Content-Type'] =
      'application/json';
  }
  return _request;
});

const apiAuthenticated = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 30000,
  timeoutErrorMessage: 'Error en la red',
  withCredentials: true,
});

apiAuthenticated.interceptors.request.use((_request) => {
  /* Append content type header if its not present */
  if (!(_request.headers as AxiosRequestHeaders)['Content-Type']) {
    (_request.headers as AxiosRequestHeaders)['Content-Type'] =
      'application/json';
  }
  /* Check if authorization is set */
  if (!(_request.headers as AxiosRequestHeaders)['Authorization']) {
    /* Check if the user is authenticated to send Bearer token */
    const token = '1|ZOf4HCtYxGs7Op6M8wJ2LwctP6hdHjqEeWifbCVy';
    if (token && token.length > 0) {
      (_request.headers as AxiosRequestHeaders).Authorization =
        'Bearer ' + token;
    } else {
      /* Send the application authentication as Bearer token */
      (_request.headers as AxiosRequestHeaders).Authorization =
        'Bearer ApiToken';
    }
  }

  /* Check if authorization is set */
  if (!(_request.headers as AxiosRequestHeaders)['Nairda-Token']) {
    /* Check if the user is authenticated to send Bearer token */
    const nairdaToken =
      '1|$2y$10$ScfLTH864whV1HiIcS7S1uyqmlnhYcfSLiP0wTx4bpyBGTbrwOqHG';
    (_request.headers as AxiosRequestHeaders)['Nairda-Token'] = nairdaToken;
  }
  return _request;
});

export { api, apiAuthenticated };
