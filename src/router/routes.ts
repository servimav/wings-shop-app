import { RouteRecordRaw } from 'vue-router';
import authRoutes from './routes/auth';
import mainRoutes from './routes/main';
import shopRoutes from './routes/shop';
import vendorRoutes from './routes/vendor';
/**
 * routes
 */
const routes: RouteRecordRaw[] = [
  mainRoutes,
  authRoutes,
  shopRoutes,
  vendorRoutes,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
