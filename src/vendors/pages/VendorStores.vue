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
    <div v-if="stores.length">
      <stores-group :data="stores" vendor />
    </div>

    <!-- <div v-else>
      <widget-skeleton :count="2" />
    </div> -->

    <q-dialog v-model="storeDialog" maximized>
      <vendor-store-form
        @cancel="storeDialog = false"
        @ok="onOk"
        @removed="onRemoved"
      />
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { notificationHelper } from 'src/helpers';
import { computed, onBeforeMount, ref } from 'vue';
import StoresGroup from 'src/components/groups/StoresGroup.vue';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
// import WidgetSkeleton from 'src/components/widgets/WidgetSkeleton.vue';
import VendorStoreForm from '../components/forms/VendorStoreForm.vue';
import { injectStrict, _vendorInjectable } from 'src/injectables';
/**
 * -----------------------------------------
 *	Injectables
 * -----------------------------------------
 */
const $vendor = injectStrict(_vendorInjectable);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const stores = computed(() => $vendor.stores);
const storeDialog = ref(false);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * onOk
 * @param s
 */
function onOk() {
  storeDialog.value = false;
}
/**
 * onRemoved
 * @param storeId
 */
function onRemoved(storeId: number) {
  const index = stores.value.findIndex((s) => s.id === storeId);
  if (index) stores.value.splice(index, 1);
}
/**
 * -----------------------------------------
 *	Lifecycle
 * -----------------------------------------
 */
onBeforeMount(async () => {
  try {
    await $vendor.listStores();
  } catch (error) {
    notificationHelper.axiosError(error);
  }
});
</script>
