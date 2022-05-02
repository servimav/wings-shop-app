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
import { injectStrict, _app, _map, _shopCategory } from 'src/injectables';

const $app = injectStrict(_app);
const $map = injectStrict(_map);
const $category = injectStrict(_shopCategory);

/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
async function init(done: CallableFunction) {
  $map.getGpsPosition();
  Promise.all([
    $category.availableAction(),
    $category.allAction(),
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
