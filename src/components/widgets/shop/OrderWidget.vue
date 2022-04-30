<template>
  <q-card>
    <q-card-section>
      <div class="text-body1">${{ Number(order.total_price).toFixed(2) }}</div>
      <div class="absolute-top-right q-pa-xs">
        <q-chip
          class="glossy"
          :label="status.text"
          :icon="status.icon"
          :color="status.color"
          :text-color="status.text_color"
        />
      </div>
      <div
        class="absolute-top-left q-pa-xs"
        v-if="
          getRemainTime(new Date(Date.parse(order.shipping_time))) &&
          order.status === 'ACCEPTED'
        "
      >
        <q-chip
          class="glossy"
          :label="
            getRemainTime(new Date(Date.parse(order.shipping_time)))?.toString()
          "
          icon="mdi-clock"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div
        v-for="(of, ofKey) in order.order_offers"
        :key="`order-offer-${order.id}-${ofKey}`"
      >
        <order-offer dense :order-offer="of" />
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn @click="goToOrder" color="primary" label="Detalles" />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { IShopOrder } from 'src/api';
import { ROUTE_NAME } from 'src/router';
import { computed, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import OrderOffer from './OrderOfferWidget.vue';
import { getRemainTime } from 'src/helpers';
const $props = defineProps<{ order: IShopOrder }>();
const $router = useRouter();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const { order } = toRefs($props);
const status = computed<{
  text: string;
  icon: string;
  color: string;
  text_color: string;
}>(() => {
  switch (order.value.status) {
    case 'ABORTED':
      return {
        icon: 'mdi-cancel',
        text: 'Cancelado por usted',
        color: 'negative',
        text_color: 'white',
      };
    case 'ACCEPTED':
      return {
        icon: 'mdi-check',
        text: 'Aceptado',
        color: 'info',
        text_color: 'white',
      };
    case 'CANCELED':
      return {
        icon: 'mdi-cancel',
        text: 'Cancelado',
        color: 'negative',
        text_color: 'dark',
      };
    case 'COMPLETED':
      return {
        icon: 'mdi-check-all',
        text: 'Completado',
        color: 'positive',
        text_color: 'dark',
      };
    default:
      return {
        icon: 'mdi-clock',
        text: 'En Proceso',
        color: '',
        text_color: 'white',
      };
  }
});
/**
 * goToOrder
 */
function goToOrder() {
  void $router.push({
    name: ROUTE_NAME.SHOP_ORDER,
    params: { id: order.value.id },
  });
}
</script>
