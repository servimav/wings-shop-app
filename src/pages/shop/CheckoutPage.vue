<template>
  <q-page padding>
    <q-stepper
      v-model="step"
      vertical
      color="primary"
      animated
      class="q-pa-none"
    >
      <!-- Auth -->
      <q-step
        v-if="!isAuth()"
        name="auth"
        title="Usuario"
        icon="mdi-account"
        class="dense q-py-sm"
        :done="isDone('auth')"
      >
        <auth-widget @auth="nextStep()" />
      </q-step>
      <!-- / Auth -->

      <!-- shipping_address -->
      <q-step
        name="shipping_address"
        title="Dirección de envío"
        icon="mdi-map-marker"
        :done="isDone('shipping_address')"
      >
        <q-input
          v-model="form.shipping_address"
          type="text"
          label="Direccion de envío"
        />

        <q-stepper-navigation class="q-gutter-x-sm">
          <q-btn
            @click="nextStep(false)"
            color="primary"
            label="Siguiente"
            dense
            rounded
            outline
            icon-right="mdi-arrow-right-bold"
            :disable="!canNext()"
          />
        </q-stepper-navigation>
      </q-step>
      <!-- / shipping_address -->

      <!-- shipping_time -->
      <q-step
        name="shipping_time"
        title="Horario"
        icon="mdi-timer"
        :done="isDone('shipping_time')"
        class="dense"
      >
        <q-toggle
          v-model="toggleDateTime"
          label="Ajustar Hora de entrega"
          color="primary"
        />
        <div class="q-pl-sm" v-if="toggleDateTime">
          <q-date
            v-model="form.shipping_time"
            :options="calendarMinDate"
            mask="YYYY-MM-DD HH:mm"
          />
          <q-time v-model="form.shipping_time" mask="YYYY-MM-DD HH:mm" />
        </div>

        <q-stepper-navigation class="q-gutter-x-sm">
          <q-btn
            @click="prevStep"
            color="primary"
            label="Atras"
            icon="mdi-arrow-left-bold"
            rounded
            outline
            dense
          />
          <q-btn
            @click="nextStep(false)"
            color="primary"
            :label="toggleDateTime ? 'Siguiente' : 'Omitir'"
            icon-right="mdi-arrow-right-bold"
            :disable="!canNext()"
            rounded
            outline
            dense
          />
        </q-stepper-navigation>
      </q-step>
      <!-- / shipping_time -->

      <!-- message -->
      <q-step
        name="message"
        title="Mensaje"
        icon="mdi-timer"
        :done="isDone('message')"
      >
        <q-toggle
          v-model="toggleMessage"
          label="Enviar un mensaje extra"
          color="primary"
        />
        <template v-if="toggleMessage">
          <q-input v-model="form.message" type="textarea" label="Mensaje" />
        </template>

        <q-stepper-navigation class="q-gutter-x-sm">
          <q-btn
            @click="prevStep"
            color="primary"
            label="Atras"
            icon="mdi-arrow-left-bold"
            rounded
            outline
            dense
          />
          <q-btn
            @click="nextStep(false)"
            color="primary"
            :label="toggleMessage ? 'Siguiente' : 'Omitir'"
            icon-right="mdi-arrow-right-bold"
            :disable="!canNext()"
            rounded
            outline
            dense
          />
        </q-stepper-navigation>
      </q-step>
      <!-- / message -->

      <!-- Details -->
      <q-step
        name="details"
        title="Resumen"
        icon="mdi-cube"
        :done="isDone('details')"
      >
        <!-- <div class="q-py-sm">
          <div
            v-for="(of, oKey) in orderOffers"
            :key="`cart-order-offer-${of.offer_id}-${oKey}`"
          >
            <order-offer-widget dense :order-offer="of" />
          </div>
        </div> -->
        <p>Subtotal: ${{ Number(orderPrices.offers_price).toFixed(2) }}</p>
        <p>
          Tarifa Envío: ${{
            (
              Number(orderPrices.shipping_price) +
              Number(orderPrices.service_price)
            ).toFixed(2)
          }}
        </p>
        <!-- <p v-if="orderPrices.service_price > 0">
          Tarifa Servicio: ${{ Number(orderPrices.service_price).toFixed(2) }}
        </p> -->
        <p>
          Total: ${{
            Number(
              orderPrices.offers_price +
                orderPrices.service_price +
                orderPrices.shipping_price
            ).toFixed(2)
          }}
        </p>
        <q-stepper-navigation class="q-gutter-x-sm">
          <q-btn
            @click="prevStep"
            color="primary"
            label="Atras"
            icon="mdi-arrow-left-bold"
            rounded
            outline
            dense
          />
          <q-btn
            @click="finish"
            color="primary"
            label="Finalizar"
            icon-right="mdi-check"
            rounded
            outline
            :disable="!canNext()"
            dense
          />
        </q-stepper-navigation>
      </q-step>
      <!-- / Details -->
    </q-stepper>
    <!-- Map Dialog -->
    <q-dialog v-model="mapPopup" maximized>
      <q-card>
        <map-widget @confirm="onMapConfirm" />
      </q-card>
    </q-dialog>
    <!-- / Map Dialog -->
  </q-page>
</template>

<script setup lang="ts">
// import OrderOfferWidget from 'components/widgets/shop/OrderOfferWidget.vue';
import MapWidget from 'src/components/widgets/MapWidget.vue';
import AuthWidget from 'src/components/widgets/AuthWidget.vue';
import { computed, onBeforeMount, ref } from 'vue';
import { injectStrict, _map, _shopCart, _shopOrder } from 'src/injectables';
import { IShopOrderCreateRequest } from 'src/api';
import { LatLng } from 'leaflet';
import { date } from 'quasar';
import { isAuth, notificationHelper } from 'src/helpers';
import { ROUTE_NAME } from 'src/router';
import { useRouter } from 'vue-router';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */

type IStepName =
  | 'auth'
  | 'details'
  | 'shipping_address'
  | 'shipping_time'
  | 'message';

const $cart = injectStrict(_shopCart);
const $map = injectStrict(_map);
const $order = injectStrict(_shopOrder);
const $router = useRouter();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const form = ref<IShopOrderCreateRequest>({
  order_offers: [],
  shipping_address: '',
  shipping_coordinate: {
    lat: 0,
    lng: 0,
  },
  shipping_time: '',
  store_id: 1,
  message: undefined,
});
const mapPopup = ref(false);
const orderOffers = computed(() => $cart.order_offers);
const step = ref<IStepName>('auth');
if (isAuth()) step.value = 'shipping_address';

const stepOrder: IStepName[] = [
  'auth',
  'shipping_address',
  'shipping_time',
  'message',
  'details',
];
const orderPrices = computed(() => $order.order_price);
const toggleDateTime = ref(false);
const toggleMessage = ref(false);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * calculatePrices
 */
async function calculatePrices() {
  try {
    await $order.calculatePrices({
      order_offers: orderOffers.value,
      shipping_coordinate: form.value.shipping_coordinate,
      store_id: $cart.active_store,
    });
  } catch (error) {
    notificationHelper.axiosError(error);
  }
}
/**
 * calendarMinDate
 */
function calendarMinDate(_date: string) {
  return _date >= date.formatDate(Date.now(), 'YYYY/MM/DD');
}
/**
 * canNext
 */
function canNext() {
  switch (step.value) {
    case 'shipping_address':
      return form.value.shipping_address && form.value.shipping_coordinate;
    case 'message':
      return !toggleMessage.value || form.value.message;
    case 'shipping_time':
      return !toggleDateTime.value || form.value.shipping_time;
  }
  return true;
}
/**
 * finish
 */
async function finish() {
  if (!isAuth()) {
    step.value = 'auth';
  } else {
    const orderMass: IShopOrderCreateRequest = {
      order_offers: orderOffers.value,
      shipping_address: form.value.shipping_address,
      shipping_coordinate: form.value.shipping_coordinate,
      shipping_time: form.value.shipping_time,
      message: form.value.message,
      store_id: $cart.active_store,
    };
    notificationHelper.loading();
    try {
      // await $order.createMassAction(orderMass);
      await $order.create(orderMass);
      notificationHelper.success(['Hemos recibido su pedido']);
      void $router.push({ name: ROUTE_NAME.SHOP_ORDERS });
    } catch (error) {
      notificationHelper.axiosError(
        error,
        'No se pudo completar el pedido, revise los datos enviados'
      );
    }
    notificationHelper.loading(false);
  }
}
/**
 * isDone
 * @param checkStep
 */
function isDone(checkStep: IStepName) {
  const currentIndex = stepOrder.findIndex((_s) => _s === step.value);
  const checkIndex = stepOrder.findIndex((_s) => _s === checkStep);
  return currentIndex > checkIndex;
}
/**
 * nextStep
 */
function nextStep(force = false) {
  const currentIndex = stepOrder.findIndex((_s) => _s === step.value);
  const mapIndex = stepOrder.findIndex((_s) => _s === 'shipping_address');
  if (mapIndex !== currentIndex || force) {
    step.value =
      stepOrder.length > currentIndex
        ? stepOrder[currentIndex + 1]
        : step.value;
  } else {
    mapPopup.value = true;
  }
}
/**
 * onMapConfirm
 * @param markers
 */
function onMapConfirm(markers: LatLng[]) {
  form.value.shipping_coordinate = markers[0];
  void calculatePrices();
  setTimeout(() => {
    mapPopup.value = false;
    nextStep(true);
  }, 750);
}
/**
 * prevStep
 */
function prevStep() {
  const currentIndex = stepOrder.findIndex((_s) => _s === step.value);
  step.value = currentIndex > 0 ? stepOrder[currentIndex - 1] : step.value;
}
/**
 * Init map gps
 */
onBeforeMount(() => {
  void $map.getGpsPosition();
});
</script>

<style>
.q-stepper--vertical .dense .q-stepper__step-inner {
  padding: 0 24px 32px 32px;
}
</style>
