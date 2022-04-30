<template>
  <q-carousel arrows infinite autoplay animated v-model="slide">
    <q-carousel-slide
      @click="goToLink(ann)"
      v-for="(ann, annKey) in $props.data"
      :key="`ann-${annKey}`"
      :name="`ann-${annKey}`"
      :img-src="image(ann)"
    >
      <div class="absolute-bottom custom-caption">
        <div class="text-h6">{{ ann.title }}</div>
        <div class="text-subtitle1" v-if="ann.subtitle">{{ ann.subtitle }}</div>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { IPublicityAnnouncement } from 'src/api';
import { useRouter } from 'vue-router';
import { ROUTE_NAME } from 'src/router';

const $props = defineProps<{ data: IPublicityAnnouncement[] }>();
const $router = useRouter();

const slide = ref('');

function image(ann: IPublicityAnnouncement): string | undefined {
  if (ann.image) return ann.image;
  if (ann.related && ann.related.model?.image) return ann.related.model?.image;
}

function goToLink(ann: IPublicityAnnouncement) {
  if (ann.related && ann.related.model && ann.related.model.id) {
    switch (ann.related.type) {
      case 'ShopStore':
        void $router.push({
          name: ROUTE_NAME.SHOP_STORE,
          params: { id: ann.related.model.id },
        });
        break;
      case 'ShopOffer':
        void $router.push({
          name: ROUTE_NAME.SHOP_OFFER,
          params: { id: ann.related.model.id },
        });
        break;
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
