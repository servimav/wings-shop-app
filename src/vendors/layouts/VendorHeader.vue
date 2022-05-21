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

      <q-btn flat dense icon="mdi-bell-outline">
        <q-badge v-if="orderCounter" color="red" floating>{{
          orderCounter
        }}</q-badge>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { injectStrict, _app, _vendorInjectable } from 'src/injectables';
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
const orderCounter = computed(() => $vendor.ordersOnProccess.length);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function toggleDrawerLeft() {
  $app.drawerLeft = !$app.drawerLeft;
}
</script>
