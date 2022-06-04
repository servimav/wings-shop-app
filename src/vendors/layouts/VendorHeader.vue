<template>
  <q-header elevated>
    <q-toolbar class="bg-primary">
      <q-btn
        flat
        dense
        round
        icon="mdi-menu"
        aria-label="Menu"
        @click="toggleDrawerLeft"
      />

      <q-toolbar-title>Modo Ventas </q-toolbar-title>

      <q-btn
        flat
        dense
        icon="mdi-bell-outline"
        @click="goTo(ROUTE_NAME.VENDOR_ORDERS)"
      >
        <q-badge v-if="orderCounter" color="red" floating>{{
          orderCounter
        }}</q-badge>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { goTo } from 'src/helpers';
import { injectStrict, _app, _vendorInjectable } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { computed } from 'vue';

/**
 * -----------------------------------------
 *	Injectables
 * -----------------------------------------
 */

const $app = injectStrict(_app);
const $vendor = injectStrict(_vendorInjectable);
/**
 * -----------------------------------------
 *	data
 * -----------------------------------------
 */
const orderCounter = computed(
  () => $vendor.ordersOnProccess.length + $vendor.ordersAccepted.length
);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function toggleDrawerLeft() {
  $app.drawerLeft = !$app.drawerLeft;
}
</script>
