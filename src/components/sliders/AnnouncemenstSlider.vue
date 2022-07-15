<template>
  <q-carousel
    arrows
    animated
    v-model="slide"
    autoplay
    infinite
    transition-prev="slide-right"
    transition-next="slide-left"
    height="auto"
    swipeable
  >
    <q-carousel-slide
      v-for="(slider, key) in $props.data"
      :name="`slider-${slider.id}`"
      :key="`slider-${slider.id}-${key}`"
    >
      <q-card @click="goTo(slider)">
        <q-img
          v-if="image(slider)"
          :src="(image(slider) as string)"
          :ratio="4 / 3"
          spinner-color="primary"
          spinner-size="82px"
        />
        <q-card-section class="text-center q-py-sm">
          <div class="text-h6">{{ slider.title }}</div>
          <div class="text-subtitle1" v-if="slider.subtitle">
            {{ slider.subtitle }}
          </div>
          <div class="text-subtitle1" v-if="slider.text">{{ slider.text }}</div>
        </q-card-section>
      </q-card>
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { openURL } from 'quasar';
import type { IPublicityAnnouncement } from 'src/api';
import { ROUTE_NAME } from 'src/router';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const $props = defineProps<{ data: IPublicityAnnouncement[] }>();
const $router = useRouter();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const slide = ref(`slider-${$props.data[0].id}`);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * Image
 * @param ann
 */
function image(ann: IPublicityAnnouncement) {
  if (ann.image) return ann.image;
  if (ann.related && ann.related.model?.image) return ann.related.model?.image;
  return null;
}
/**
 * goTo
 * @param slider
 */
function goTo(slider: IPublicityAnnouncement) {
  if (slider) {
    if (slider.url) {
      openURL(slider.url, (err) => {
        console.log(err);
      });
    } else if (slider.related && slider.related.model && slider.related.type) {
      switch (slider.related.type) {
        case 'ShopOffer':
          void $router.push({
            name: ROUTE_NAME.SHOP_OFFER,
            params: { id: slider.related.model.id },
          });
          break;
        case 'ShopStore':
          void $router.push({
            name: ROUTE_NAME.SHOP_STORE,
            params: { id: slider.related.model.id },
          });
          break;
      }
    }
  }
}
</script>
