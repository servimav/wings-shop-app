<template>
  <q-page padding>
    <section class="q-gutter-y-sm">
      <order-offer-widget
        v-for="(of, oKey) in orderOffers"
        :key="`order-offer-${of.offer_id}-${oKey}`"
        :order-offer="of"
      />
      <q-card class="no-box-shadow text-grey-9" v-if="orderOffers.length <= 0">
        <q-card-section class="text-center" @click="goTo(ROUTE_NAME.HOME)">
          <div class="text-h6">Su carrito está vacío</div>
          <div class="text-subtitle2 text-primary">
            ¿Desea seguir buscando ofertas?
          </div>
        </q-card-section>
      </q-card>
    </section>
    <!-- Float Button -->
    <section
      class="fixed-bottom"
      style="margin-bottom: 3rem"
      v-if="orderOffers.length > 0"
    >
      <q-card class="no-shadow-box">
        <q-card-section class="q-pa-xs">
          <q-btn
            color="primary"
            text-color="dark"
            class="full-width"
            icon="mdi-cart"
            label="Completar Pedido"
            @click="goToCheckout"
            rounded
          />
        </q-card-section>
      </q-card>
    </section>
    <!-- / Float Button -->

    <!-- <q-dialog v-model="authDialog" maximized>
      <auth-widget @auth="authDialog = false" />
    </q-dialog> -->
  </q-page>
</template>

<script setup lang="ts">
import { injectStrict, _shopCart } from 'src/injectables';
import { computed } from 'vue';
import OrderOfferWidget from 'src/components/widgets/shop/OrderOfferWidget.vue';
// import AuthWidget from 'components/widgets/AuthWidget.vue';
import { goTo } from 'src/helpers';
import { ROUTE_NAME } from 'src/router';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
const $cart = injectStrict(_shopCart);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
// const authDialog = ref(false);
const orderOffers = computed(() => $cart.order_offers);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function goToCheckout() {
  if (orderOffers.value.length > 0) goTo(ROUTE_NAME.SHOP_CHECKOUT);
}
</script>
