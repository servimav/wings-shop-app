import { AxiosError } from 'axios';
import { $router } from 'src/boot/router';
import { Notify, QSpinnerGears } from 'quasar';
import { INotifyPosition } from 'src/types/quasar';
import { ROUTE_NAME } from 'src/router';
import { $user } from 'src/injectables';
/**
 * ErrorHandler
 */
class NotificationHelper {
  /**
   * axiosError
   * @param _error
   */
  axiosError<T = unknown>(
    _error: unknown,
    _default: string | undefined = 'Error en la red'
  ) {
    console.log({ AxiosError: _error });
    const error = _error as AxiosError<T>;
    if (error.response) {
      if (error.response.status === 401) {
        $user.logout();
        void $router.push({ name: ROUTE_NAME.HOME });
        return;
      }
    }
    if (_default) {
      this.error([_default]);
    }
  }
  /**
   * Loading
   */
  private _loading: CallableFunction | undefined;
  /**
   * success
   * @param _p
   */
  success(_p: string[], timeout = 7000, position: INotifyPosition = 'center') {
    _p.forEach((message) => {
      Notify.create({
        type: 'positive',
        message,
        position,
        timeout,
        actions: [
          {
            label: 'x',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    });
  }
  /**
   * success
   * @param _p
   */
  error(_p: string[], timeout = 7000, position: INotifyPosition = 'center') {
    _p.forEach((message) => {
      Notify.create({
        type: 'negative',
        message,
        position,
        timeout,
        actions: [
          {
            label: 'x',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    });
  }
  /**
   * loading
   * @param _load
   * @param message
   */
  loading(
    _load = true,
    message = 'Cargando...',
    timeout = 0,
    position: INotifyPosition = 'center'
  ) {
    if (_load) {
      this._loading = Notify.create({
        spinner: QSpinnerGears,
        position,
        message,
        timeout,
      });
    } else {
      if (this._loading) this._loading();
    }
  }
}
/**
 * Notification Helper Instance
 */
export const notificationHelper = new NotificationHelper();
