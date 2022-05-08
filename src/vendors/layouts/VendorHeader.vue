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

      <q-btn flat dense icon="mdi-bell-outline" />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { injectStrict, _app } from 'src/injectables';
/**
 * -----------------------------------------
 *	Injectables
 * -----------------------------------------
 */

const $app = injectStrict(_app);
/**
 * -----------------------------------------
 *	data
 * -----------------------------------------
 */
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function toggleDrawerLeft() {
  $app.drawerLeft = !$app.drawerLeft;
}
</script>
