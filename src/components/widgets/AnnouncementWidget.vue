<template>
  <q-card class="full-width" @click="goToLink()">
    <q-img
      v-if="image"
      :src="image"
      spinner-color="primary"
      spinner-size="82px"
    >
      <div class="absolute-bottom custom-caption">
        <div class="text-h6">{{ $props.data.title }}</div>
        <div class="text-subtitle1" v-if="$props.data.subtitle">
          {{ $props.data.subtitle }}
        </div>
      </div>
    </q-img>
  </q-card>
</template>

<script setup lang="ts">
import { IPublicityAnnouncement } from 'src/api';
import { ROUTE_NAME } from 'src/router';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const $props = defineProps<{ data: IPublicityAnnouncement }>();
const $router = useRouter();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const image = computed<string | null>(() => {
  if ($props.data.image) return $props.data.image;
  if ($props.data.related && $props.data.related.model?.image)
    return $props.data.related.model?.image;
  return null;
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * goToLink
 */
function goToLink() {
  const ann = $props.data;
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
