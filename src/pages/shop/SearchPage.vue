<template>
  <q-page padding>
    <section class="q-gutter-y-sm">
      <title-widget :data="{ title: 'Tiendas' }" v-if="stores.length" />
      <div>
        <stores-group :data="stores" />
      </div>
      <title-widget :data="{ title: 'Ofertas' }" v-if="offers.length" />
      <div>
        <offers-group :data="offers" />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import TitleWidget from 'components/widgets/TitleWidget.vue';
import OffersGroup from 'src/components/groups/OffersGroup.vue';
import StoresGroup from 'src/components/groups/StoresGroup.vue';
import { IShopOffer, IShopStore } from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { ref, onBeforeMount } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */

const $route = useRoute();
onBeforeRouteUpdate((to, from, next) => {
  if (to.name === from.name && to.query.search)
    init(to.query.search.toString());
  next();
});
onBeforeMount(() => {
  if ($route.query.search) void init($route.query.search?.toString());
});
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const offers = ref<IShopOffer[]>([]);
const stores = ref<IShopStore[]>([]);
/**
 * -----------------------------------------
 *	methods
 * -----------------------------------------
 */

async function init(search: string) {
  notificationHelper.loading();
  try {
    const resp = await $nairdaApi.Shop.search({
      search,
      type: 'ALL',
    });
    offers.value = [];
    stores.value = [];
    if (resp.data.offers) offers.value = resp.data.offers;
    if (resp.data.stores) stores.value = resp.data.stores;
  } catch (error) {
    notificationHelper.axiosError(error);
  }
  notificationHelper.loading(false);
}
</script>
