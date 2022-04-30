import { $router } from 'src/boot/router';
import { $user } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';

export * from './notification';
/**
 * goTo
 * @param route
 */
export const goTo = (route: ROUTE_NAME) => {
  void $router.push({ name: route });
};
/**
 * isAuth
 * @returns
 */
export const isAuth = () => Boolean($user.apiToken);
/**
 *
 * @param dateTo
 * @param dateFrom
 * @returns
 */
export const getDuration = function (dateTo: Date, dateFrom: Date) {
  const d3 = new Date(
    (dateTo as unknown as number) - (dateFrom as unknown as number)
  );
  const d0 = new Date(0);

  return {
    getDays: function () {
      return Math.ceil(Number(d3) / (1000 * 60 * 60 * 24));
    },
    getHours: function () {
      return d3.getHours() - d0.getHours();
    },
    getMinutes: function () {
      return d3.getMinutes() - d0.getMinutes();
    },
    getMilliseconds: function () {
      return d3.getMilliseconds() - d0.getMilliseconds();
    },
    toString: function () {
      return (
        this.getHours() + ':' + this.getMinutes() + ':' + this.getMilliseconds()
      );
    },
  };
};
/**
 * getRemainTime
 * @param time
 * @returns
 */
export const getRemainTime = (time: Date) => {
  const dateDiff = getDuration(time, new Date());
  const minutes = dateDiff.getMinutes();
  const hours = dateDiff.getHours();
  const days = dateDiff.getDays();
  if (days > 0) return `${days} dias`;
  if (hours > 0) return `${hours} horas`;
  if (minutes > 0) return `${minutes} minutos`;
  return null;
};
