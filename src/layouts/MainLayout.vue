<template>
  <q-layout view="lHh Lpr lFF">
    <app-header />

    <drawer-left />
    <q-pull-to-refresh @refresh="init">
      <q-page-container class="text-grey-9">
        <router-view />
      </q-page-container>
    </q-pull-to-refresh>
    <app-footer />
  </q-layout>
</template>

<script lang="ts" setup>
import AppFooter from './MainFooter.vue';
import AppHeader from './MainHeader.vue';
import DrawerLeft from './MainDrawerLeft.vue';
import { provide } from 'vue';
import {
  _shopCategory,
  $shopCategory,
  _shopCart,
  $shopCartInjectable,
  $mapInjectable,
  _map,
  _shopOrder,
  $shopOrderInjectable,
  injectStrict,
  _app,
} from 'src/injectables';

const $app = injectStrict(_app);
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
provide(_map, $mapInjectable);
provide(_shopCategory, $shopCategory);
provide(_shopOrder, $shopOrderInjectable);
provide(_shopCart, $shopCartInjectable);
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
async function init(done: CallableFunction) {
  $mapInjectable.getGpsPosition();
  Promise.all([
    $shopCategory.availableAction(),
    $shopCategory.allAction(),
    $app.loadOffers(),
    $app.loadStores(),
    $app.loadAnnouncements(),
  ]).finally(() => {
    done();
  });
}
init(() => {
  console.log('Refresh');
});
</script>
