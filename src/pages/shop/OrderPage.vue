<template>
  <q-page padding>
    <q-card v-if="order.id > 0">
      <q-card-section>
        <div class="absolute-top-right q-pa-xs">
          <q-chip
            class="glossy"
            :label="status.text"
            :icon="status.icon"
            :color="status.color"
            :text-color="status.text_color"
          />
        </div>
        <div class="text-body1">
          Precio: ${{ Number(order.total_price).toFixed(2) }}
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
      <q-card-section class="q-gutter-y-sm">
        <div class="text-subtitle1" v-if="order.shipping_address">
          <p>Precio de Ofertas: ${{ Number(order.offers_price).toFixed(2) }}</p>
          <p>
            Tarifa de Servicio: ${{ Number(order.service_price).toFixed(2) }}
          </p>
          <p>Total: ${{ Number(order.total_price).toFixed(2) }}</p>
        </div>
        <div class="text-subtitle1" v-if="order.shipping_address">
          Dirección: {{ order.shipping_address }}
          <q-chip
            class="glossy"
            icon="mdi-map-marker"
            label="Ver en Mapa"
            clickable
            @click="mapDialog = true"
          />
        </div>
        <div class="text-subtitle1" v-if="order.shipping_time">
          <span v-if="duration && order.status === 'ACCEPTED'"
            >Completar en {{ duration }}</span
          >
          <span v-else> Horario: {{ order.shipping_time }} </span>
        </div>
        <div class="text-subtitle1" v-if="order.message">
          Mensaje: {{ order.message }}
        </div>
      </q-card-section>
      <q-card-actions>
        <q-btn
          v-if="canComplete"
          color="positive"
          icon="mdi-check-all"
          label="Completar"
          @click="completetOrder"
          class="full-width"
        /><q-btn
          v-if="canAccept"
          color="info"
          icon="mdi-check"
          label="Aceptar"
          @click="acceptOrder"
          class="full-width"
        />
        <q-btn
          v-if="canCancel"
          color="negative"
          icon="mdi-cancel"
          label="Cancelar"
          @click="cancelOrder"
          class="full-width"
        />
      </q-card-actions>
    </q-card>

    <!-- MapDialog -->
    <q-dialog v-model="mapDialog" maximized>
      <map-widget
        :initial-markers="[initialMarkers]"
        readonly
        @confirm="mapDialog = false"
      />
    </q-dialog>
    <!-- / MapDialog -->
  </q-page>
</template>

<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { IShopOrder, IShopOrderStatus } from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { getRemainTime, notificationHelper } from 'src/helpers';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { date as qDate, Dialog } from 'quasar';
import OrderOffer from 'components/widgets/shop/OrderOfferWidget.vue';
import MapWidget from 'src/components/widgets/MapWidget.vue';
import { latLng } from 'leaflet';
import { ROUTE_NAME } from 'src/router';

const $route = useRoute();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const asVendor = computed(() => $route.name === ROUTE_NAME.VENDOR_ORDER);

const canAccept = computed(() => {
  return order.value.status === 'PROCESSING' && asVendor.value;
});
const canComplete = computed(() => {
  return order.value.status === 'ACCEPTED' && asVendor.value;
});
const canCancel = computed(() => {
  if (order.value.status === 'PROCESSING') return true;
  else if (order.value.status === 'ACCEPTED') {
    const orderDay = qDate.getDayOfYear(order.value.shipping_time);
    const today = qDate.getDayOfYear(new Date());
    return today < orderDay;
  } else return false;
});
const duration = computed(() =>
  getRemainTime(new Date(Date.parse(order.value.shipping_time)))
);
const initialMarkers = computed(() =>
  latLng(
    order.value.shipping_coordinate.lat,
    order.value.shipping_coordinate.lng
  )
);
const mapDialog = ref(false);
const order = ref<IShopOrder>({
  id: 0,
  order_offers: [],
  shipping_address: '',
  shipping_coordinate: { lat: 0, lng: 0 },
  shipping_time: '',
  status: 'CANCELED',
  total_price: 0,
  offers_price: 0,
  service_price: 0,
});
const status = computed<{
  text: string;
  icon: string;
  color: string;
  text_color: 'white' | 'dark';
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
        text_color: 'dark',
      };
    case 'CANCELED':
      return {
        icon: 'mdi-cancel',
        text: 'Cancelado',
        color: 'negative',
        text_color: 'white',
      };
    case 'COMPLETED':
      return {
        icon: 'mdi-check-all',
        text: 'Completado',
        color: 'positive',
        text_color: 'white',
      };
    default:
      return {
        icon: 'mdi-clock',
        text: 'En Proceso',
        color: '',
        text_color: 'dark',
      };
  }
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */

/**
 * init
 */
async function init() {
  if ($route.params.id && !isNaN(Number($route.params.id))) {
    const id = Number($route.params.id);
    notificationHelper.loading();
    try {
      const resp = await $nairdaApi.ShopOrder.find(id);
      order.value = resp.data;
    } catch (error) {
      notificationHelper.axiosError(error, 'No encontramos la tienda');
    }
    notificationHelper.loading(false);
  }
}
/**
 * acceptOrder
 */
function acceptOrder() {
  Dialog.create({
    cancel: 'No',
    ok: 'Si',
    message: '¿Desea Aceptar el pedido?',
    title: 'Aceptar Pedido',
    color: 'positive',
  }).onOk(async () => {
    notificationHelper.loading();
    try {
      const resp = await $nairdaApi.ShopOrder.updateStatus(order.value.id, {
        status: 'ACCEPTED',
      });
      order.value = resp.data;
    } catch (error) {
      notificationHelper.axiosError(error, 'Error guardando orden');
    }
    notificationHelper.loading(false);
  });
}
/**
 * completetOrder
 */
function completetOrder() {
  Dialog.create({
    cancel: 'No',
    ok: 'Si',
    message: '¿Desea Completar el pedido?',
    title: 'Completar Pedido',
    color: 'positive',
  }).onOk(async () => {
    notificationHelper.loading();
    try {
      const resp = await $nairdaApi.ShopOrder.updateStatus(order.value.id, {
        status: 'COMPLETED',
      });
      order.value = resp.data;
    } catch (error) {
      notificationHelper.axiosError(error, 'Error guardando orden');
    }
    notificationHelper.loading(false);
  });
}

/**
 * Cancel Order
 */
function cancelOrder() {
  Dialog.create({
    cancel: 'No',
    ok: 'Si',
    message: '¿Desea cancelar el pedido?',
    title: 'Cancelar Pedido',
    color: 'negative',
  }).onOk(async () => {
    notificationHelper.loading();
    try {
      let status: IShopOrderStatus = 'ABORTED';
      if (asVendor.value) status = 'CANCELED';
      console.log(status);
      const resp = await $nairdaApi.ShopOrder.updateStatus(order.value.id, {
        status,
      });
      order.value = resp.data;
    } catch (error) {
      notificationHelper.axiosError(error, 'Error guardando orden');
    }
    notificationHelper.loading(false);
  });
}

void init();
</script>
