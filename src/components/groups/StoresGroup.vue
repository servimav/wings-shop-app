<template>
  <div class="row q-col-gutter-sm">
    <div
      class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
      v-for="(d, oKey) in $props.data"
      :key="`store-group-${d.id}-${oKey}`"
    >
      <store-widget :data="d" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IShopStore } from 'src/api';
import StoreWidget from '../widgets/shop/StoreWidget.vue';
const $props = defineProps<{ data: IShopStore[] }>();
</script>
