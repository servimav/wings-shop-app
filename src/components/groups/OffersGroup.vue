<template>
  <div class="row q-col-gutter-sm">
    <div
      class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
      v-for="(offer, oKey) in $props.data"
      :key="`offer-${offer.id}-${oKey}`"
    >
      <offer-widget :data="offer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IShopOffer } from 'src/api';
import OfferWidget from '../widgets/shop/OfferWidget.vue';
const $props = defineProps<{ data: IShopOffer[] }>();
</script>
