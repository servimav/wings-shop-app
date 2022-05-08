<template>
  <div
    :class="`${$props.horizontal ? 'q-gutter-y-sm' : 'row q-col-gutter-sm'}`"
  >
    <div
      :class="`${
        $props.horizontal ? '' : 'col-xs-6 col-sm-4 col-md-3 col-lg-2'
      }`"
      v-for="(d, oKey) in $props.data"
      :key="`store-group-${d.id}-${oKey}`"
    >
      <store-widget
        :data="d"
        :vendor="$props.vendor ? $props.vendor : undefined"
        :horizontal="$props.horizontal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IShopStore } from 'src/api';
import StoreWidget from '../widgets/shop/StoreWidget.vue';
const $props = defineProps<{
  data: IShopStore[];
  vendor?: boolean;
  horizontal?: boolean;
}>();
</script>
