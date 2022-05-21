<template>
  <q-page padding>
    <section class="q-gutter-y-sm" v-if="orders.length">
      <title-widget :data="{ title: 'Nuevos Pedidos' }" />
      <div class="row q-col-gutter-sm">
        <div
          class="col-xs-12"
          v-for="(o, k) in orders"
          :key="`order-on-process-${o.id}-k${k}`"
        >
          <order-widget :order="o" as-vendor />
        </div>
      </div>
    </section>

    <section v-else>
      <q-card class="no-box-shadow">
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
import OrderWidget from 'src/components/widgets/shop/OrderWidget.vue';
import { injectStrict, _vendorInjectable } from 'src/injectables';
import { computed, onBeforeMount } from 'vue';
import { notificationHelper } from 'src/helpers';

const $vendor = injectStrict(_vendorInjectable);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const orders = computed(() => $vendor.ordersOnProccess);

onBeforeMount(async () => {
  try {
    await $vendor.listOrders();
  } catch (error) {
    notificationHelper.axiosError(error);
  }
});
</script>
