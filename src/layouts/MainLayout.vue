<template>
  <q-layout view="lHh Lpr lFF">
    <app-header />

    <drawer-left />
    <q-pull-to-refresh @refresh="init">
      <q-page-container class="text-grey-9">
        <router-view v-if="currentLocality" />
        <q-page padding v-else>
          <map-locality-selector @complete="onComplete" />
        </q-page>
      </q-page-container>
    </q-pull-to-refresh>
    <app-footer />
  </q-layout>
</template>

<script lang="ts" setup>
import AppFooter from './MainFooter.vue';
import AppHeader from './MainHeader.vue';
import DrawerLeft from './MainDrawerLeft.vue';
import MapLocalitySelector from 'src/components/forms/MapLocalitySelector.vue';
import {
  injectStrict,
  _app,
  _map,
  _shopCategory,
  _user,
} from 'src/injectables';
import { computed } from '@vue/reactivity';
import { notificationHelper } from 'src/helpers';

const $app = injectStrict(_app);
const $map = injectStrict(_map);
const $category = injectStrict(_shopCategory);
const $user = injectStrict(_user);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const currentLocality = computed(() => $app.locality);

function onComplete() {
  void init(() => console.log('Map Completed'));
}
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
async function init(done: CallableFunction) {
  $map.getGpsPosition();
  if (currentLocality) {
    Promise.all([
      $category.availableAction(),
      $category.allAction(),
      $app.loadOffers(),
      $app.loadStores(),
      $app.loadAnnouncements(),
      $user.getProfile(),
    ])
      .catch((e) => {
        notificationHelper.axiosError(e, 'Ha ocurrido un error');
      })
      .finally(() => {
        done();
      });
  } else {
    done();
  }
}
init(() => {
  console.log('Refresh');
});
$app.setMode('user');
</script>
