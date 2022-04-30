import { isAuth } from 'src/helpers';
import { ROUTE_NAME } from '../names';
import { NavigationGuard } from 'vue-router';
/**
 * authGuard
 * @param _to
 * @param _from
 * @param _next
 */
export const authGuard: NavigationGuard = (to, from, next) => {
  if (!isAuth()) {
    next({ name: ROUTE_NAME.AUTH_LOGIN });
  } else {
    next();
  }
};
