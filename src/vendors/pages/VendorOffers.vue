<template>
  <q-page padding class="q-gutter-y-sm">
    <title-widget :data="{ title: 'Mis Ofertas' }" />
    <div>
      <q-btn
        color="primary"
        icon="mdi-plus"
        class="full-width"
        label="Nueva Oferta"
      />
    </div>
    <div v-if="offers.length">
      <offers-group :data="offers" vendor />
    </div>

    <!-- <div v-else>
      <widget-skeleton :count="2" />
    </div> -->
  </q-page>
</template>

<script setup lang="ts">
import { IShopOffer } from 'src/api';
import { $servimavApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { computed, ref } from 'vue';
import OffersGroup from 'src/components/groups/OffersGroup.vue';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
// import WidgetSkeleton from 'src/components/widgets/WidgetSkeleton.vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const offers = ref<IShopOffer[]>([]);
const storeId = computed(() =>
  $route.query.store_id ? Number($route.query.store_id) : 0
);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * listOffers
 */
async function listOffers() {
  notificationHelper.loading();
  try {
    const resp = (await $servimavApi.ShopStore.offers(storeId.value)).data;
    offers.value = resp;
  } catch (error) {
    notificationHelper.axiosError(error);
  }
  notificationHelper.loading(false);
}

void listOffers();
</script>
