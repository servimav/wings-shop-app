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
      <!-- Details -->
      <q-step
        name="details"
        title="Detalles"
        icon="mdi-cube"
        :done="isDone('details')"
      >
        <div class="q-py-sm">
          <div
            v-for="(of, oKey) in orderOffers"
            :key="`cart-order-offer-${of.offer_id}-${oKey}`"
          >
            <order-offer-widget dense :order-offer="of" />
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn
            @click="nextStep(false)"
            color="primary"
            label="Siguiente"
            icon-right="mdi-arrow-right-bold"
            rounded
            outline
            :disable="!canNext()"
          />
        </q-stepper-navigation>
      </q-step>
      <!-- / Details -->

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
            @click="prevStep"
            color="primary"
            label="Atras"
            rounded
            outline
            icon="mdi-arrow-left-bold"
          />
          <q-btn
            @click="nextStep(false)"
            color="primary"
            label="Siguiente"
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
        class="dense q-py-sm"
      >
        <q-toggle
          v-model="toggleDateTime"
          label="Ajustar Hora de entrega"
          color="primary"
        />
        <template v-if="toggleDateTime">
          <q-date
            v-model="form.shipping_time"
            :options="calendarMinDate"
            mask="YYYY-MM-DD HH:mm"
          />
          <q-time v-model="form.shipping_time" mask="YYYY-MM-DD HH:mm" />
        </template>

        <q-stepper-navigation class="q-gutter-x-sm">
          <q-btn
            @click="prevStep"
            color="primary"
            label="Atras"
            icon="mdi-arrow-left-bold"
            rounded
            outline
          />
          <q-btn
            @click="nextStep(false)"
            color="primary"
            :label="toggleDateTime ? 'Siguiente' : 'Omitir'"
            icon-right="mdi-arrow-right-bold"
            :disable="!canNext()"
            rounded
            outline
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
          />
          <q-btn
            @click="nextStep(false)"
            color="primary"
            :label="toggleMessage ? 'Siguiente' : 'Omitir'"
            icon-right="mdi-arrow-right-bold"
            :disable="!canNext()"
            rounded
            outline
          />
        </q-stepper-navigation>
      </q-step>
      <!-- / summary -->

      <!-- summary -->
      <q-step
        name="summary"
        title="Finalizar"
        icon="mdi-timer"
        :done="isDone('summary')"
      >
        <q-stepper-navigation class="q-gutter-x-sm">
          <q-btn
            @click="prevStep"
            color="primary"
            label="Atras"
            icon="mdi-arrow-left-bold"
            rounded
            outline
          />
          <q-btn
            @click="finish"
            color="primary"
            label="Comprar"
            icon-right="mdi-arrow-right-bold"
            :disable="!canNext()"
            rounded
            outline
          />
        </q-stepper-navigation>
      </q-step>
      <!-- / summary -->
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
import OrderOfferWidget from 'components/widgets/shop/OrderOfferWidget.vue';
import MapWidget from 'src/components/widgets/MapWidget.vue';
import AuthWidget from 'src/components/widgets/AuthWidget.vue';
import { computed, ref } from 'vue';
import { injectStrict, _shopCart, _shopOrder } from 'src/injectables';
import { IShopOrderCreateRequest } from 'src/api';
import { LatLng } from 'leaflet';
import { date } from 'quasar';
import { isAuth } from 'src/helpers';
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
  | 'message'
  | 'summary';

const $cart = injectStrict(_shopCart);
const $order = injectStrict(_shopOrder);
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
if (isAuth()) step.value = 'details';

const stepOrder: IStepName[] = [
  'auth',
  'details',
  'shipping_address',
  'shipping_time',
  'message',
  'summary',
];
const toggleDateTime = ref(false);
const toggleMessage = ref(false);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
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
    const orderMass: Omit<IShopOrderCreateRequest, 'store_id'> = {
      order_offers: orderOffers.value,
      shipping_address: form.value.shipping_address,
      shipping_coordinate: form.value.shipping_coordinate,
      shipping_time: form.value.shipping_time,
      message: form.value.message,
    };
    await $order.createMassAction(orderMass);
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
  setTimeout(() => {
    mapPopup.value = false;
    nextStep(true);
  }, 100);
}
/**
 * prevStep
 */
function prevStep() {
  const currentIndex = stepOrder.findIndex((_s) => _s === step.value);
  step.value = currentIndex > 0 ? stepOrder[currentIndex - 1] : step.value;
}
</script>

<style>
.q-stepper--vertical .dense .q-stepper__step-inner {
  padding: 0 24px 32px 32px;
}
</style>
