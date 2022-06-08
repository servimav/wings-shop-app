<template>
  <q-page padding>
    <section class="q-gutter-y-sm">
      <title-widget :data="{ title: 'Resultados de la Búsqueda' }" />
      <title-widget :data="{ title: 'Tiendas' }" v-if="stores.length" />
      <div>
        <stores-group :data="stores" />
      </div>
      <title-widget :data="{ title: 'Ofertas' }" v-if="offers.length" />
      <offers-group horizontal :data="offers" />
    </section>

    <section v-if="!offers.length && !stores.length">
      <widget-skeleton :count="4" />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import TitleWidget from 'components/widgets/TitleWidget.vue';
import OffersGroup from 'src/components/groups/OffersGroup.vue';
import StoresGroup from 'src/components/groups/StoresGroup.vue';
import WidgetSkeleton from 'components/widgets/WidgetSkeleton.vue';

import { IShopOffer, IShopStore } from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { ref, onBeforeMount, computed } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { injectStrict, _app } from 'src/injectables';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */

const $app = injectStrict(_app);
const $route = useRoute();

onBeforeRouteUpdate((to, from, next) => {
  if (to.name === from.name && to.query.search)
    runSearch(to.query.search.toString());
  next();
});
onBeforeMount(() => {
  if ($route.query.search) void runSearch($route.query.search?.toString());
});
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const localityId = computed(() => $app.locality?.id);
const offers = ref<IShopOffer[]>([]);
const stores = ref<IShopStore[]>([]);
/**
 * -----------------------------------------
 *	methods
 * -----------------------------------------
 */
/**
 * Run Search
 * @param search
 */
async function runSearch(search: string) {
  notificationHelper.loading();
  Promise.all([void searchOffers(search), void searchStores(search)])
    .catch((e) => {
      notificationHelper.axiosError(e, 'Error en la búsqueda');
    })
    .finally(() => {
      notificationHelper.loading(false);
    });
}
/**
 * Search Offers
 * @param search
 */
async function searchOffers(search: string) {
  offers.value = (
    await $nairdaApi.ShopOffer.filter({
      locality_id: localityId.value,
      description: search,
    })
  ).data;
}
/**
 * Search Stores
 * @param search
 */
async function searchStores(search: string) {
  stores.value = (
    await $nairdaApi.ShopStore.filter({
      title: search,
      locality_id: localityId.value,
    })
  ).data;
}
</script>
