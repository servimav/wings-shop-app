<template>
  <q-layout view="lHh Lpr lFF">
    <vendor-header />

    <vendor-drawer-left />
    <q-pull-to-refresh @refresh="init">
      <q-page-container class="text-grey-9">
        <router-view />
      </q-page-container>
    </q-pull-to-refresh>
    <!-- <vendor-footer /> -->
  </q-layout>
</template>

<script lang="ts" setup>
// import VendorFooter from './VendorFooter.vue';
import VendorHeader from './VendorHeader.vue';
import VendorDrawerLeft from './VendorDrawerLeft.vue';
import {
  $vendorInjectable,
  injectStrict,
  _app,
  _shopCategory,
  _vendorInjectable,
} from 'src/injectables';
import { notificationHelper } from 'src/helpers';
import { onBeforeMount, provide } from 'vue';

const $app = injectStrict(_app);
const $category = injectStrict(_shopCategory);

provide(_vendorInjectable, $vendorInjectable);
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
/**
 * init
 * @param done
 */
async function init(done: CallableFunction) {
  Promise.all([
    $category.allAction(),
    $app.listLocalities(),
    await $vendorInjectable.listStores(),
    $vendorInjectable.listOrders(),
  ])
    .catch((e) => {
      notificationHelper.axiosError(e);
    })
    .finally(() => {
      done();
    });
}
onBeforeMount(() => {
  // Set app mode
  $app.setMode('shop_vendor');
  init(() => console.log('Init'));
});
</script>
