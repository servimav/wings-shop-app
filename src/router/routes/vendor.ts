import VendorLayout from 'src/vendors/layouts/VendorLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { ROUTE_NAME } from '../names';
import { vendorGuard } from './guards';
// import { authGuard } from './guards';

const route: RouteRecordRaw = {
  path: '/vendor',
  component: VendorLayout,
  beforeEnter: vendorGuard,
  children: [
    {
      path: '',
      name: ROUTE_NAME.VENDOR_HOME,
      component: () => import('src/vendors/pages/VendorHome.vue'),
    },
  ],
};

export default route;
