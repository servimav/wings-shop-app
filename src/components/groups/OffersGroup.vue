<template>
  <div
    :class="`${$props.horizontal ? 'q-gutter-y-sm' : 'row q-col-gutter-sm'}`"
  >
    <div
      :class="`${
        $props.horizontal ? '' : 'col-xs-6 col-sm-4 col-md-3 col-lg-2'
      }`"
      v-for="(offer, oKey) in $props.data"
      :key="`offer-${offer.id}-${oKey}`"
    >
      <offer-widget
        :data="offer"
        :vendor="$props.vendor ? $props.vendor : undefined"
        :horizontal="$props.horizontal"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IShopOffer } from 'src/api';
import OfferWidget from '../widgets/shop/OfferWidget.vue';
const $props = defineProps<{
  data: IShopOffer[];
  vendor?: boolean;
  horizontal?: boolean;
}>();
</script>
