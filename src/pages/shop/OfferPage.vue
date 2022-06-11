<template>
  <q-page padding v-if="offer">
    <section class="q-gutter-y-sm text-grey-9" style="padding-bottom: 3rem">
      <!-- Edit button -->
      <q-btn
        color="primary"
        label="Editar Oferta"
        v-if="isVendor"
        class="full-width"
        icon="mdi-pencil"
        @click="editDialog = true"
      />
      <!-- /Edit button -->
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
            v-if="offer.stock_type !== 'INFINITY'"
            style="padding: 0.2rem"
          >
            <template v-if="offer.stock_type == 'SOLD_OUT'"> AGOTADO </template>
            <template v-if="offer.stock_type == 'LIMITED'">
              {{ offer.stock_qty }}x<q-icon name="mdi-cube" />
            </template>
          </div>

          <div class="absolute-top-right" style="padding: 0.2rem">
            {{ offer.type === 'PRODUCT' ? 'Producto' : 'Servicio' }}
          </div>
        </q-img>
        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">
            <q-btn
              color="primary"
              outline
              icon="mdi-store"
              class="full-width"
              label="Ir a la Tienda"
              @click="goToStore"
            />
          </div>
          <div class="text-h6">{{ offer.title }}</div>
          <div class="text-subtitle2">
            ${{ Number(offer.sell_price).toFixed(2) }}
          </div>
        </q-card-section>
        <q-card-section v-html="offer.description" />
      </q-card>
    </section>

    <!-- Footer -->
    <section
      class="fixed-bottom"
      style="margin-bottom: 3rem"
      v-if="footerMenu && !isVendor"
    >
      <q-card>
        <q-card-section class="q-pa-none">
          <div class="row" v-if="offer?.type === 'PRODUCT'">
            <div class="col">
              <input-spinner
                v-model="qty"
                :min="0"
                :max="offer?.stock_qty ? offer?.stock_qty : 100"
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

    <!-- Edit Dialog -->
    <q-dialog v-model="editDialog" maximized v-if="isVendor">
      <vendor-offer-form
        :update="offer"
        @ok="onEditOk"
        @removed="onRemoved"
        @cancel="editDialog = false"
        :store-id="offer.store_id"
      />
    </q-dialog>
    <!-- / Edit Dialog -->
  </q-page>
  <page-skeleton v-else />
</template>

<script setup lang="ts">
import { IShopOffer } from 'src/api';
import { $servimavApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { injectStrict, _shopCart } from 'src/injectables';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InputSpinner from 'src/components/forms/InputSpinner.vue';
import PageSkeleton from 'src/components/widgets/PageSkeleton.vue';
import VendorOfferForm from 'src/vendors/components/forms/VendorOfferForm.vue';
import { ROUTE_NAME } from 'src/router';
import { Dialog } from 'quasar';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
const $cart = injectStrict(_shopCart);
const $route = useRoute();
const $router = useRouter();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const cartOffer = computed(() =>
  $cart.order_offers.find((_o) => _o.offer_id === offer.value?.id)
);
const addToCartNormal = computed(
  () => $cart.active_store === 0 || $cart.active_store === offer.value?.store_id
);
const editDialog = ref(false);
const footerMenu = computed(
  () =>
    (offer.value && offer.value.type === 'SERVICE') ||
    (offer.value?.stock_type === 'LIMITED' && offer.value.stock_qty > 0) ||
    offer.value?.stock_type === 'INFINITY'
);
const isVendor = computed(() => $route.name === ROUTE_NAME.VENDOR_OFFER);
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
    if (addToCartNormal.value) {
      $cart.addOrderOffer(offer.value as IShopOffer, qty.value);
      // void $router.push({
      //   name: ROUTE_NAME.SHOP_STORE,
      //   params: { id: $cart.active_store },
      // });
      void $router.push({ name: ROUTE_NAME.SHOP_CART });
    } else {
      Dialog.create({
        title: 'Conflicto de Tiendas',
        message:
          'Solamente puede tener ofertas de una sola tienda en el carrito. ¿Desea Continuar?',
        ok: true,
        cancel: true,
      }).onOk(() => {
        $cart.restartOrderOffers();
        $cart.addOrderOffer(offer.value as IShopOffer, qty.value);
        // void $router.push({
        //   name: ROUTE_NAME.SHOP_STORE,
        //   params: { id: $cart.active_store },
        // });
        void $router.push({ name: ROUTE_NAME.SHOP_CART });
      });
    }
  }
}
/**
 * goToStore
 */
function goToStore() {
  if (isVendor.value) {
    void $router.push({
      name: ROUTE_NAME.VENDOR_STORE,
      params: { id: offer.value?.store_id },
    });
  } else {
    void $router.push({
      name: ROUTE_NAME.SHOP_STORE,
      params: { id: offer.value?.store_id },
    });
  }
}
/**
 * loadOffer
 */
async function loadOffer() {
  if ($route.params.id && !isNaN(Number($route.params.id))) {
    try {
      const resp = (await $servimavApi.ShopOffer.find(Number($route.params.id)))
        .data;
      offer.value = resp;
      if (cartOffer.value && cartOffer.value.qty)
        qty.value = cartOffer.value.qty;
      // Check if offer belongs to current store
      if (!addToCartNormal.value) {
        Dialog.create({
          title: 'Tienda Diferente',
          message:
            'Tiene en el carrito ofertas de una tienda diferente. Solamente puede tener ofertas de una sola tienda en el carrito',
          ok: true,
        });
      }
    } catch (error) {
      notificationHelper.axiosError(error);
    }
  }
}
/**
 * onEditOk
 * @param s
 */
function onEditOk(s: IShopOffer) {
  offer.value = s;
  editDialog.value = false;
}
/**
 * On Removed
 */
function onRemoved() {
  void goToStore();
}
/**
 * On Before Mount
 */
onBeforeMount(async () => {
  await loadOffer();
});
</script>
