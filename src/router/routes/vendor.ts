import VendorLayout from 'src/vendors/layouts/VendorLayout.vue';
import { RouteRecordRaw } from 'vue-router';
import { ROUTE_NAME } from '../names';
import { vendorGuard } from '../guards';

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
    {
      path: 'billings',
      name: ROUTE_NAME.VENDOR_BILLINGS,
      component: () => import('src/vendors/pages/BillingsPage.vue'),
    },
    {
      path: 'help',
      name: ROUTE_NAME.VENDOR_HELP,
      component: () => import('src/vendors/pages/VendorHelp.vue'),
    },
    {
      path: 'offers',
      name: ROUTE_NAME.VENDOR_OFFERS,
      component: () => import('src/vendors/pages/VendorOffers.vue'),
    },
    {
      path: 'offers/:id',
      name: ROUTE_NAME.VENDOR_OFFER,
      component: () => import('src/pages/shop/OfferPage.vue'),
    },
    {
      path: 'orders',
      name: ROUTE_NAME.VENDOR_ORDERS,
      component: () => import('src/vendors/pages/VendorOrders.vue'),
    },
    {
      path: 'orders/:id',
      name: ROUTE_NAME.VENDOR_ORDER,
      component: () => import('src/pages/shop/OrderPage.vue'),
    },
    {
      path: 'stats',
      name: ROUTE_NAME.VENDOR_STATS,
      component: () => import('src/vendors/pages/VendorStats.vue'),
    },
    {
      path: 'stores',
      name: ROUTE_NAME.VENDOR_STORES,
      component: () => import('src/vendors/pages/VendorStores.vue'),
    },
    {
      path: 'stores/:id',
      name: ROUTE_NAME.VENDOR_STORE,
      component: () => import('pages/shop/StorePage.vue'),
    },
    {
      path: 'profile',
      name: ROUTE_NAME.VENDOR_PROFILE,
      component: () => import('pages/user/ProfilePage.vue'),
    },
    {
      path: 'telegram-access',
      name: ROUTE_NAME.TELEGRAM_ACCESS,
      component: () => import('pages/ConfirmTelegram.vue'),
    },
  ],
};

export default route;
