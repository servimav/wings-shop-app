<template>
  <q-card @click="goToStore">
    <q-card-section v-if="$props.horizontal" horizontal>
      <q-img
        :src="$props.data.image"
        spinner-color="primary"
        spinner-size="82px"
        :ratio="4 / 3"
        class="col-6"
        ><div
          class="absolute-top-left"
          style="padding: 0px; background-color: transparent"
        >
          <q-chip dense>
            <span>{{ data.rating }}</span>
            <q-icon name="mdi-star" color="orange" size="1rem" />
          </q-chip>
        </div>
      </q-img>
      <q-card-section>
        <div class="text-subtitle2">{{ $props.data.title }}</div>
      </q-card-section>
    </q-card-section>
    <template v-else>
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
        <div class="text-subtitle2">{{ $props.data.title }}</div>
      </q-card-section>
    </template>
  </q-card>
</template>

<script setup lang="ts">
import { IShopStore } from 'src/api';
import { ROUTE_NAME } from 'src/router';
import { useRouter } from 'vue-router';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
const $props = defineProps<{
  data: IShopStore;
  vendor?: boolean;
  horizontal?: boolean;
}>();
const $router = useRouter();
/**
 * goToStore
 */
function goToStore() {
  if ($props.vendor) {
    void $router.push({
      name: ROUTE_NAME.VENDOR_STORE,
      params: { id: $props.data.id },
    });
  } else {
    void $router.push({
      name: ROUTE_NAME.SHOP_STORE,
      params: { id: $props.data.id },
    });
  }
}
</script>
<style scoped>
.store-widget-title {
  min-height: 3.5rem;
}
</style>
