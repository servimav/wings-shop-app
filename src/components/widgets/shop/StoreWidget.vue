<template>
  <q-card @click="goToStore">
    <q-img
      :src="$props.data.image"
      spinner-color="primary"
      spinner-size="82px"
      :ratio="4 / 3"
    >
      <div
        class="absolute-top-left"
        style="padding: 0px; background-color: transparent"
      >
        <q-chip dense>
          <span>{{ data.rating }}</span>
          <q-icon name="mdi-star" color="orange" size="1rem" />
        </q-chip>
      </div>
    </q-img>
    <q-card-section class="q-pa-xs text-center store-widget-title">
      <div class="text-body1">{{ $props.data.title }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { IShopStore } from 'src/api';
import { ROUTE_NAME } from 'src/router';
import { useRouter } from 'vue-router';
import {} from 'src/helpers';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
const $props = defineProps<{ data: IShopStore }>();
const $router = useRouter();
function goToStore() {
  void $router.push({
    name: ROUTE_NAME.SHOP_STORE,
    params: { id: $props.data.id },
  });
}
</script>
<style scoped>
.store-widget-title {
  min-height: 3.5rem;
}
</style>
