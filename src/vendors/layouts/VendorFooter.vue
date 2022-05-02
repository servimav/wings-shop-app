<template>
  <q-footer elevated class="bg-primary">
    <q-tabs
      align="justify"
      indicator-color="transparent"
      active-color="secondary"
      id="tab-buttons"
      no-caps
    >
      <q-route-tab exact :to="{ name: ROUTE_NAME.HOME }">
        <q-icon name="mdi-home" size="1.6rem" />
      </q-route-tab>
      <q-route-tab exact :to="{ name: ROUTE_NAME.SHOP_STORES }">
        <q-icon name="mdi-store" size="1.6rem" />
      </q-route-tab>
      <q-route-tab exact :to="{ name: ROUTE_NAME.SHOP_CART }">
        <q-icon name="mdi-cart-outline" size="1.6rem" />
        <q-badge color="dark" floating v-if="countCart && countCart > 0">
          {{ countCart }}
        </q-badge>
      </q-route-tab>

      <!-- <q-route-tab exact icon="mdi-magnify" :to="{name: 'main.home'}">
        <span class="text-body2 text-weight-bolder">Buscar</span>
      </q-route-tab>-->
      <q-tab>
        <q-icon
          size="1.6rem"
          name="mdi-apps"
          @click="$app.toggleDrawerLeft()"
        />
      </q-tab>
    </q-tabs>
  </q-footer>
</template>
<script lang="ts" setup>
import { injectStrict, _app, _shopCart } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { computed } from 'vue';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
const $app = injectStrict(_app);
const $cart = injectStrict(_shopCart);
/**
 * -----------------------------------------
 *	data
 * -----------------------------------------
 */
const countCart = computed(() => $cart.order_offers.length);
</script>

<style>
.footer-tabs .q-tab__icon {
  font-size: 5rem;
}
</style>
