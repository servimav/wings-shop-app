<template>
  <q-page padding class="text-grey-9">
    <section class="q-gutter-y-sm" v-if="stores.length">
      <title-widget :data="{ title: 'Tiendas' }" />
      <div>
        <stores-group :data="stores" />
      </div>
    </section>
  </q-page>
</template>

<script setup lang="ts">
import { IShopStore } from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { ROUTE_NAME } from 'src/router';
import { notificationHelper, goTo } from 'src/helpers';
import { ref } from 'vue';
import StoresGroup from 'src/components/groups/StoresGroup.vue';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
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
  notificationHelper.loading();
  try {
    const resp = await $nairdaApi.ShopStore.list();
    stores.value = resp.data.data;
    if (!stores.value.length) goTo(ROUTE_NAME.HOME);
  } catch (error) {
    notificationHelper.axiosError(error, 'No hay conexión');
    goTo(ROUTE_NAME.HOME);
  }
  notificationHelper.loading(false);
}
void loadStores();
</script>
