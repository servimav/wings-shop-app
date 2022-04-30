<template>
  <q-card v-if="orderOffer.offer" class="text-grey-9">
    <div
      v-if="!dense"
      class="q-pa-sm float-right cursor-pointer text-negative"
      @click="remove"
    >
      <q-icon size="1.2rem" name="mdi-delete" />
    </div>
    <q-card-section
      horizontal
      @click="goToOffer"
      :style="dense ? '' : 'min-height: 5.5rem'"
    >
      <q-avatar v-if="!dense" size="5.2rem" rounded style="padding: 0.2rem">
        <img
          style="border-radius: 50%"
          :src="orderOffer.offer.image"
          :alt="orderOffer.offer?.title"
        />
      </q-avatar>
      <div class="q-pa-md">
        <div :class="dense ? 'text-subtitle2' : 'text-body1'">
          {{ orderOffer.offer.title }}
          <q-chip :dense="dense" class="glossy" :label="`x${orderOffer.qty}`" />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { IShopOrderOffer } from 'src/api';
import { toRefs } from 'vue';
import { Dialog } from 'quasar';
import {} from 'src/helpers';
import { useRouter } from 'vue-router';
import { ROUTE_NAME } from 'src/router';
import { injectStrict, _shopCart } from 'src/injectables';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */

interface Props {
  orderOffer: IShopOrderOffer;
  dense?: boolean;
}
const $cart = injectStrict(_shopCart);
const $props = defineProps<Props>();
const $router = useRouter();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const { orderOffer, dense } = toRefs($props);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * goToOffer
 */
function goToOffer() {
  if (!$props.dense) {
    void $router.push({
      name: ROUTE_NAME.SHOP_OFFER,
      params: { id: orderOffer.value.offer_id },
    });
  }
}

function remove() {
  Dialog.create({
    cancel: true,
    ok: true,
    title: 'Eliminar Oferta',
    message: 'Desea eliminar la oferta?',
  }).onOk(() => {
    $cart.removeOrderOffer(Number(orderOffer.value.offer_id));
  });
}
</script>
