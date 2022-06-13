<template>
  <q-page padding>
    <section class="q-gutter-y-sm">
      <title-widget
        :data="{ title: 'Su carrito está vacío' }"
        v-if="orderOffers.length <= 0"
      />
      <q-btn
        color="primary"
        icon="mdi-cart"
        label="Buscar más Ofertas"
        class="full-width"
        :to="{ name: ROUTE_NAME.HOME }"
      />

      <order-offer-widget
        v-for="(of, oKey) in orderOffers"
        :key="`order-offer-${of.offer_id}-${oKey}`"
        :order-offer="of"
      />
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
            label="Comprar"
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
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
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
