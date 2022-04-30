<template>
  <q-card class="text-grey-9 text-center">
    <q-card-section class="q-pa-xs">
      <div class="text-h6">{{ $props.data.title }}</div>
      <div class="text-subtitle2" v-if="$props.data.subtitle">
        {{ $props.data.subtitle }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const $props = defineProps<{
  data: {
    title: string;
    subtitle?: string;
  };
}>();
</script>
