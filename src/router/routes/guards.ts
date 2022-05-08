import { isAuth, notificationHelper } from 'src/helpers';
import { ROUTE_NAME } from '../names';
import { NavigationGuard } from 'vue-router';
import { $user } from 'src/injectables';
/**
 * adminGuard
 * @param to
 * @param from
 * @param next
 */
export const adminGuard: NavigationGuard = (to, from, next) => {
  if ($user.isAdmin) next();
  else {
    notificationHelper.error(['No tiene permisos suficientes']);
    next({ name: ROUTE_NAME.AUTH });
  }
};
/**
 * authGuard
 * @param _to
 * @param _from
 * @param _next
 */
export const authGuard: NavigationGuard = (to, from, next) => {
  if (!isAuth()) {
    next({ name: ROUTE_NAME.AUTH });
  } else {
    next();
  }
};
/**
 * vendorGuard
 * @param to
 * @param from
 * @param next
 */
export const vendorGuard: NavigationGuard = (to, from, next) => {
  if ($user.isVendor || $user.isAdmin) next();
  else {
    notificationHelper.error(['No tiene permisos suficientes']);
    next({ name: ROUTE_NAME.AUTH });
  }
};
