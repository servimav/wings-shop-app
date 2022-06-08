<template>
  <q-page padding class="text-grey-9">
    <section v-if="stores.length">
      <title-widget :data="{ title: 'Tiendas' }" />
      <stores-group :data="stores" class="q-mt-xs" />
    </section>

    <section v-else>
      <widget-skeleton :count="4" />
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { IShopStore } from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { ROUTE_NAME } from 'src/router';
import { notificationHelper, goTo } from 'src/helpers';
import { computed, ref } from 'vue';
import StoresGroup from 'src/components/groups/StoresGroup.vue';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
import WidgetSkeleton from 'components/widgets/WidgetSkeleton.vue';

import { injectStrict, _app } from 'src/injectables';
/**
 * -----------------------------------------
 *	Injectable
 * -----------------------------------------
 */
const $app = injectStrict(_app);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const locality = computed(() => $app.locality);
const stores = ref<IShopStore[]>([]);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * loadStores
 */
async function loadStores() {
  try {
    stores.value = (
      await $nairdaApi.ShopStore.filter({
        locality_id: locality.value?.id,
      })
    ).data;
    if (!stores.value.length) goTo(ROUTE_NAME.HOME);
  } catch (error) {
    notificationHelper.axiosError(error, 'No hay conexión');
    goTo(ROUTE_NAME.HOME);
  }
}
void loadStores();
</script>
