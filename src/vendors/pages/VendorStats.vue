<template>
  <q-page padding class="q-gutter-y-sm">
    <title-widget :data="{ title: 'Estadísticas' }" />

    <q-card class="no-box-shadow">
      <q-card-section>
        <q-chip class="glossy" icon="mdi-store" label="10 Tiendas" />
        <q-chip class="glossy" icon="mdi-gift" label="10 Productos" />
        <q-chip class="glossy" icon="mdi-truck-delivery" label="10 Órdenes" />
        <q-chip class="glossy" icon="mdi-account" label="10 Clientes" />
        <q-chip class="glossy" icon="mdi-cash" label="100 Ventas" />
        <q-chip class="glossy" icon="mdi-cash" label="100 Ganancias" />
        <!-- <q-chip class="glossy" icon="mdi-eye-outline" label="100 Visualizaciones" /> -->
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
</script>
