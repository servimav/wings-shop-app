import { boot } from 'quasar/wrappers';
import { $app, $user } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ redirect, urlPath }) => {
  await $app.load();
  await $user.load();
  // if ($user.apiToken) {
  //   $user.getProfile().catch((e: AxiosError) => {
  //     console.log('Profile error', e);
  //     if (e.response?.status === 401) void redirect({ name: ROUTE_NAME.AUTH });
  //   });
  // }
  if ($app.mode === 'shop_vendor') {
    if (
      ($user.isVendor || $user.isAdmin) &&
      (urlPath === '/' || urlPath === '/#/')
    )
      void redirect({ name: ROUTE_NAME.VENDOR_HOME });
  }
});
