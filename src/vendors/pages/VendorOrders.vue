<template>
  <q-page padding class="q-gutter-y-sm">
    <q-card class="no-box-shadow">
      <q-card-section>
        <div class="text-h6 text-center">Total {{ total }}</div>
        <div class="text-subtitle2 text-center">
          <q-chip class="glossy" icon="mdi-plus" label="Más Datos" />
        </div>
      </q-card-section>
      <q-card-section>
        <q-tabs v-model="tabSelector" dense align="center" mobile-arrows>
          <q-tab name="PROCESSING" icon="mdi-star" label="Nuevos">
            <q-badge v-if="orders.PROCESSING.length" color="primary" floating>{{
              orders.PROCESSING.length
            }}</q-badge>
          </q-tab>
          <q-tab name="ACCEPTED" icon="mdi-clock" label="Pendientes">
            <q-badge v-if="orders.ACCEPTED.length" color="info" floating>{{
              orders.ACCEPTED.length
            }}</q-badge>
          </q-tab>
          <q-tab name="CANCELED" icon="mdi-cancel" label="Cancelados">
            <q-badge v-if="orders.CANCELED.length" color="negative" floating>{{
              orders.CANCELED.length
            }}</q-badge>
          </q-tab>
          <q-tab name="ABORTED" icon="mdi-cancel" label="Abortados">
            <q-badge v-if="orders.ABORTED.length" color="negative" floating>{{
              orders.ABORTED.length
            }}</q-badge>
          </q-tab>
          <q-tab name="COMPLETED" icon="mdi-check-all" label="Completados">
            <q-badge v-if="orders.COMPLETED.length" color="positive" floating>{{
              orders.COMPLETED.length
            }}</q-badge>
          </q-tab>
        </q-tabs>
      </q-card-section>
    </q-card>

    <div>
      <div class="row q-col-gutter-sm">
        <div
          class="col-xs-12"
          v-for="(o, k) in orders[tabSelector]"
          :key="`order-${o.id}-${k}-${tabSelector}`"
        >
          <order-widget :order="o" as-vendor />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { IShopOrder } from 'src/api';
import { injectStrict, _vendorInjectable } from 'src/injectables';
import { computed, ref } from 'vue';
import OrderWidget from 'components/widgets/shop/OrderWidget.vue';
/**
 * ISelector
 */
interface ISelector {
  ABORTED: IShopOrder[];
  ACCEPTED: IShopOrder[];
  CANCELED: IShopOrder[];
  COMPLETED: IShopOrder[];
  PROCESSING: IShopOrder[];
}
/**
 * -----------------------------------------
 *	Injectable
 * -----------------------------------------
 */
const $vendor = injectStrict(_vendorInjectable);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const orders = computed<ISelector>(() => ({
  ABORTED: $vendor.ordersAborted,
  ACCEPTED: $vendor.ordersAccepted,
  CANCELED: $vendor.ordersCanceled,
  COMPLETED: $vendor.ordersCompleted,
  PROCESSING: $vendor.ordersOnProccess,
}));
const total = computed(
  () =>
    orders.value.ABORTED.length +
    orders.value.ACCEPTED.length +
    orders.value.CANCELED.length +
    orders.value.COMPLETED.length +
    orders.value.PROCESSING.length
);
const tabSelector = ref<keyof ISelector>('PROCESSING');
</script>
