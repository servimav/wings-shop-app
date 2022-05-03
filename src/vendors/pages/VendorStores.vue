<template>
  <q-page padding class="q-gutter-y-sm">
    <title-widget :data="{ title: 'Mis Tiendas' }" />
    <div>
      <q-btn
        @click="storeDialog = true"
        color="secondary"
        icon="mdi-plus"
        class="full-width"
        label="Nueva Tienda"
      />
    </div>
    <div>
      <stores-group :data="stores" vendor />
    </div>

    <q-dialog v-model="storeDialog" maximized>
      <vendor-store-form @cancel="storeDialog = false" @ok="onOk" />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { IShopStore } from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { ref } from 'vue';
import StoresGroup from 'src/components/groups/StoresGroup.vue';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
import VendorStoreForm from '../components/forms/VendorStoreForm.vue';
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const stores = ref<IShopStore[]>([]);
const storeDialog = ref(false);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * listStores
 */
async function listStores() {
  notificationHelper.loading();
  try {
    const resp = (await $nairdaApi.ShopStore.list(true)).data;
    stores.value = resp.data;
  } catch (error) {
    notificationHelper.axiosError(error);
  }
  notificationHelper.loading(false);
}
/**
 * onOk
 * @param s
 */
function onOk(s: IShopStore) {
  stores.value.unshift(s);
  storeDialog.value = false;
}
void listStores();
</script>
