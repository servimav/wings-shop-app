import MainLayoutVue from 'src/layouts/MainLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { ROUTE_NAME } from '../names';
import { authGuard } from './guards';

const route: RouteRecordRaw = {
  path: '/',
  component: MainLayoutVue,
  children: [
    {
      path: '',
      name: ROUTE_NAME.HOME,
      component: () => import('pages/IndexPage.vue'),
    },
    {
      path: 'about',
      name: ROUTE_NAME.ABOUT,
      component: () => import('pages/AboutUs.vue'),
    },
    {
      path: 'profile',
      name: ROUTE_NAME.USER_PROFILE,
      beforeEnter: authGuard,
      component: () => import('src/pages/user/ProfilePage.vue'),
    },
    {
      path: 'role-req',
      name: ROUTE_NAME.USER_ROLE_REQUEST,
      beforeEnter: authGuard,
      component: () => import('src/pages/user/RoleRequestPage.vue'),
    },
  ],
};

export default route;
