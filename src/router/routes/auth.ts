import AuthLayoutVue from 'src/layouts/AuthLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { ROUTE_NAME } from '../names';

const route: RouteRecordRaw = {
  path: '/auth',
  component: AuthLayoutVue,
  children: [
    {
      path: '',
      name: ROUTE_NAME.AUTH_LOGIN,
      component: () => import('pages/auth/LoginPage.vue'),
    },
    {
      path: 'register',
      name: ROUTE_NAME.AUTH_REGISTER,
      component: () => import('pages/auth/RegisterPage.vue'),
    },
  ],
};

export default route;
