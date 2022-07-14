<template>
  <q-card>
    <q-card-section>
      <div class="absolute-top-right q-pa-xs">
        <q-chip
          class="glossy"
          :label="$props.data.completed_at ? 'Pagado' : 'Pendiente'"
          :icon="$props.data.completed_at ? 'mdi-check' : 'mdi-clock'"
          :color="$props.data.completed_at ? 'positive' : ''"
          :text-color="$props.data.completed_at ? 'white' : 'dark'"
        />
      </div>
      <div class="text-body1">Factura No. {{ $props.data.id }}</div>
      <div class="text-subtitle2">
        ${{ Number($props.data.value).toFixed(2) }}
      </div>
      <div class="text-subtitle2">{{ $props.data.comments }}</div>
      <div class="text-subtitle2" v-if="$props.data.created_at">
        Fecha: {{ new Date($props.data.created_at).toLocaleDateString() }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { IBilling } from 'src/api';

const $props = defineProps<{ data: IBilling }>();
</script>
