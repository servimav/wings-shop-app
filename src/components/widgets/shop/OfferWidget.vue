<template>
  <q-card class="text-grey-9" @click="goToOffer">
    <!-- horizontal -->
    <q-card-section v-if="$props.horizontal" horizontal>
      <q-img
        :src="data.image"
        :ratio="4 / 3"
        spinner-color="primary"
        class="col-6"
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
      <q-card-section>
        <q-chip
          class="glossy"
          icon="mdi-cancel"
          label="AGOTADO"
          v-if="data.stock_type === 'SOLD_OUT'"
        />
        <div class="text-body1">{{ data.title }}</div>
        <div class="text-subtitle2">
          ${{ Number(data.sell_price).toFixed(2) }}
        </div>

        <div class="text-subtitle2" v-if="$props.data.category">
          <q-icon :name="$props.data.category?.icons.mdi" class="q-mr-sm" />{{
            $props.data.category?.title
          }}
        </div>
      </q-card-section>
    </q-card-section>
    <!-- / horizontal -->

    <template v-else>
      <q-img :src="data.image" :ratio="4 / 3" spinner-color="primary">
        <div class="absolute-top-right" style="padding: 0.2rem">
          ${{ Number(data.sell_price).toFixed(2) }}
        </div>
        <div
          class="absolute-top-left"
          style="padding: 0px; background-color: transparent"
        >
          <q-chip dense>
            <span>{{ data.rating }}</span>
            <q-icon name="mdi-star" color="orange" size="1rem" />
          </q-chip>
        </div>
        <div
          class="absolute-top-left"
          style="padding: 0.2rem"
          v-if="data.stock_type === 'SOLD_OUT'"
        >
          AGOTADO
        </div>
      </q-img>
      <q-card-section class="text-center q-pa-xs offer-widget-title">
        <div class="text-subtitle2">{{ data.title }}</div>
      </q-card-section>
    </template>
  </q-card>
</template>

<script setup lang="ts">
import { IShopOffer } from 'src/api';
import {} from 'src/helpers';
import { ROUTE_NAME } from 'src/router';
import { toRefs } from 'vue';
import { useRouter } from 'vue-router';

const $props = defineProps<{
  data: IShopOffer;
  vendor?: boolean;
  horizontal?: boolean;
}>();
const $router = useRouter();
const { data, vendor } = toRefs($props);
/**
 *
 */
function goToOffer() {
  if (vendor?.value) {
    void $router.push({
      name: ROUTE_NAME.VENDOR_OFFER,
      params: { id: data.value.id },
    });
  } else {
    void $router.push({
      name: ROUTE_NAME.SHOP_OFFER,
      params: { id: data.value.id },
    });
  }
}
</script>

<style scoped>
.offer-widget-title {
  min-height: 3.5rem;
}
</style>
