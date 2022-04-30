<template>
  <carousel :items-to-show="2" :wrap-around="true">
    <slide
      v-for="(d, key) in $props.data"
      :key="`slider-offer-${d.id}-${key}`"
      class="q-px-xs"
    >
      <offer-widget class="full-width" :data="d" />
    </slide>

    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import OfferWidget from '../widgets/shop/OfferWidget.vue';
import type { IShopOffer } from 'src/api';

const $props = defineProps<{ data: IShopOffer[] }>();
</script>
