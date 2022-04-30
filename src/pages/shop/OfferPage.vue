<template>
  <q-page padding>
    <section
      class="q-gutter-y-sm text-grey-9"
      style="padding-bottom: 3rem"
      v-if="offer"
    >
      <q-card class="no-box-shadow">
        <q-img
          :src="offer.image"
          :ratio="4 / 3"
          spinner-color="primary"
          spinner-size="82px"
          :alt="offer.title"
        >
          <div
            class="absolute-top-left"
            style="padding: 0px; background-color: transparent"
          >
            <q-chip dense>
              <span>{{ offer.rating }}</span>
              <q-icon name="mdi-star" color="orange" size="1rem" />
            </q-chip>
          </div>
          <div
            class="absolute-bottom-right"
            v-if="offer.category"
            style="padding: 0.2rem"
          >
            <q-icon class="q-mr-sm" :name="offer.category.icons.mdi" />
            {{ offer.category?.title }}
          </div>
          <div
            class="absolute-bottom-left"
            v-if="offer.stock_type === 'SOLD_OUT'"
            style="padding: 0.2rem"
          >
            AGOTADO
          </div>

          <div class="absolute-top-right" style="padding: 0.2rem">
            {{ offer.type === 'PRODUCT' ? 'Producto' : 'Servicio' }}
          </div>
        </q-img>
        <q-card-section>
          <div class="text-h6">{{ offer.title }}</div>
          <div class="text-subtitle2">
            ${{ Number(offer.sell_price).toFixed(2) }}
          </div>
        </q-card-section>
        <q-card-section v-html="offer.description" />
      </q-card>
    </section>

    <!-- Footer -->
    <section class="fixed-bottom" style="margin-bottom: 3rem" v-if="footerMenu">
      <q-card>
        <q-card-section class="q-pa-none">
          <div class="row" v-if="offer?.type === 'PRODUCT'">
            <div class="col">
              <input-spinner
                v-model="qty"
                :min="0"
                :max="offer?.stock_qty ? offer?.stock_qty + 1 : 100"
                button-class="bg-secondary"
              />
            </div>
            <div class="col">
              <q-btn
                color="primary"
                style="height: 2.5rem"
                icon="mdi-cart-plus"
                class="full-width"
                label="Añadir"
                @click="addToCart"
              />
            </div>
          </div>
          <div v-else>
            <q-btn
              color="primary"
              style="height: 2.5rem"
              icon="mdi-cart-plus"
              class="full-width"
              label="Solicitar"
              rounded
            />
          </div>
        </q-card-section>
      </q-card>
    </section>
    <!-- / Footer -->
  </q-page>
</template>

<script setup lang="ts">
import { IShopOffer } from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { goTo, notificationHelper } from 'src/helpers';
import { injectStrict, _shopCart } from 'src/injectables';
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import InputSpinner from 'src/components/forms/InputSpinner.vue';
import { ROUTE_NAME } from 'src/router';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
const $cart = injectStrict(_shopCart);
const $route = useRoute();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const cartOffer = computed(() =>
  $cart.order_offers.find((_o) => _o.offer_id === offer.value?.id)
);
const footerMenu = computed(
  () =>
    (offer.value && offer.value.type === 'SERVICE') ||
    (offer.value?.stock_type === 'LIMITED' && offer.value.stock_qty > 0) ||
    offer.value?.stock_type === 'INFINITY'
);
const offer = ref<IShopOffer | undefined>(undefined);
const qty = ref(1);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * addToCart
 */
function addToCart() {
  if (offer.value) {
    $cart.addOrderOffer(offer.value, qty.value);
    goTo(ROUTE_NAME.SHOP_CART);
  }
}
/**
 * loadOffer
 */
async function loadOffer() {
  if ($route.params.id && !isNaN(Number($route.params.id))) {
    notificationHelper.loading();
    try {
      const resp = await $nairdaApi.ShopOffer.find(Number($route.params.id));
      offer.value = resp.data;
      if (cartOffer.value && cartOffer.value.qty)
        qty.value = cartOffer.value.qty;
    } catch (error) {
      notificationHelper.axiosError(error);
    }
    notificationHelper.loading(false);
  }
}
void loadOffer();
</script>
