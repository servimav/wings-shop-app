<template>
  <carousel :items-to-show="1" :wrap-around="true">
    <slide v-for="(d, key) in $props.data" :key="`slider-ann-${d.id}-${key}`">
      <announcement-widget :data="d" />
    </slide>

    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import AnnouncementWidget from '../widgets/AnnouncementWidget.vue';
import type { IPublicityAnnouncement } from 'src/api';

const $props = defineProps<{ data: IPublicityAnnouncement[] }>();
</script>
