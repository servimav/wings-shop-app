<template>
  <q-page padding class="q-gutter-y-sm">
    <q-card class="no-box-shadow">
      <q-card-section>
        <div class="text-h6 text-center">Pedidos</div>
      </q-card-section>
      <q-card-section>
        <q-tabs v-model="tabSelector" dense align="center" mobile-arrows>
          <q-tab name="PROCESSING" icon="mdi-star" label="Nuevos" />
          <q-tab name="ACCEPTED" icon="mdi-clock" label="Pendientes" />
          <q-tab name="CANCELED" icon="mdi-cancel" label="Cancelados" />
          <q-tab name="ABORTED" icon="mdi-cancel" label="Abortados" />
          <q-tab name="COMPLETED" icon="mdi-check-all" label="Completados" />
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
const tabSelector = ref<keyof ISelector>('PROCESSING');
</script>
