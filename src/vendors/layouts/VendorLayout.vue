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
import { injectStrict, _app, _shopCategory } from 'src/injectables';

const $app = injectStrict(_app);
const $category = injectStrict(_shopCategory);
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
  await $category.allAction();
  done();
}
init(() => {
  console.log('Refresh');
});
// Set app mode
$app.setMode('shop_vendor');
</script>
