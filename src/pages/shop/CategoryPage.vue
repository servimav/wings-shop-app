<template>
  <q-page padding>
    <section class="q-gutter-y-sm">
      <template v-if="stores.length">
        <title-widget :data="{ title: 'Tiendas' }" />
        <div>
          <stores-group :data="stores" />
        </div>
      </template>
      <template v-if="offers.length">
        <title-widget :data="{ title: 'Ofertas' }" />
        <div>
          <offers-group :data="offers" />
        </div>
      </template>
    </section>

    <section v-if="!stores.length && !offers.length">
      <widget-skeleton :count="4" />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import TitleWidget from 'components/widgets/TitleWidget.vue';
import OffersGroup from 'src/components/groups/OffersGroup.vue';
import StoresGroup from 'src/components/groups/StoresGroup.vue';
import WidgetSkeleton from 'src/components/widgets/WidgetSkeleton.vue';
import { IShopOffer, IShopStore } from 'src/api';
import { $servimavApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { ref } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */

const $route = useRoute();
onBeforeRouteUpdate((to, from, next) => {
  if (to.name === from.name && to.query.tag) init(to.query.tag.toString());
  next();
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

async function init(catTag: string) {
  try {
    const resp = await $servimavApi.ShopCategory.find({ tag: catTag });
    offers.value = [];
    stores.value = [];
    if (resp.data.offers) offers.value = resp.data.offers;
    if (resp.data.stores) stores.value = resp.data.stores;
  } catch (error) {
    notificationHelper.axiosError(error);
  }
}

if ($route.query.tag) void init($route.query.tag?.toString());
</script>
