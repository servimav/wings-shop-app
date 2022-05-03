<template>
  <q-page padding class="q-gutter-y-sm" v-if="store">
    <!-- Edit button -->
    <q-btn
      color="secondary"
      icon="mdi-pencil"
      label="Editar Tienda"
      v-if="isVendor"
      class="full-width"
      @click="editDialog = true"
    />
    <!-- /Edit button -->
    <q-card class="no-box-shadow text-grey-9">
      <q-img
        :src="store.image"
        :ratio="4 / 3"
        spinner-color="primary"
        spinner-size="82px"
      >
        <!-- Top Left -->
        <div
          class="absolute-top-left"
          style="padding: 0px; background-color: transparent"
        >
          <q-chip dense>
            <span>{{ store.rating }}</span>
            <q-icon name="mdi-star" color="orange" size="1rem" />
          </q-chip>
        </div>
        <!-- / Top Left -->
        <!-- Top right -->
        <div
          class="absolute-top-right"
          style="padding: 0px; background-color: transparent"
        >
          <q-chip
            class="glossy"
            icon="mdi-map-marker"
            label="Ver en el Mapa"
            clickable
            @click="mapDialog = true"
          />
        </div>
        <!-- /Top right -->
        <!-- bottom right -->
        <div
          class="absolute-bottom-right"
          v-if="store.category"
          style="padding: 0.2rem"
        >
          <q-icon class="q-mr-sm" :name="store.category.icons.mdi" />
          {{ store.category?.title }}
        </div>
        <!-- /bottom right -->
      </q-img>
      <q-card-section>
        <div class="text-h6">{{ store.title }}</div>
        <div class="text-subtitle">
          Nos encontramos en: {{ store.map_address }}
        </div>
        <div class="text-subtitle"></div>
      </q-card-section>
      <q-card-section v-html="store.description" />
    </q-card>

    <title-widget :data="{ title: 'Ofertas' }" v-if="store.offers?.length" />
    <div v-if="isVendor">
      <q-btn
        color="secondary"
        icon="mdi-plus"
        class="full-width"
        label="Nueva Oferta"
        @click="addOfferDialog = true"
      />
    </div>
    <div>
      <offers-group
        :data="store.offers"
        v-if="store.offers?.length"
        :vendor="isVendor"
      />
    </div>

    <!-- Map Dialog -->
    <q-dialog v-model="mapDialog" maximized>
      <map-widget
        :initial-markers="[store.map_coordinate]"
        readonly
        @confirm="mapDialog = false"
      />
    </q-dialog>
    <!-- / Map Dialog -->

    <!-- Edit Dialog -->
    <q-dialog v-model="editDialog" maximized v-if="isVendor">
      <vendor-store-form
        :update="store"
        @ok="onEditOk"
        @cancel="editDialog = false"
        @removed="onStoreRemoved"
      />
    </q-dialog>
    <!-- / Edit Dialog -->

    <!-- Add offer Dialog -->
    <q-dialog v-model="addOfferDialog" maximized v-if="isVendor">
      <vendor-offer-form
        @ok="onAddOfferOk"
        @cancel="editDialog = false"
        :store-id="store.id"
        @removed="onOfferRemoved"
      />
    </q-dialog>
    <!-- / Add offer Dialog -->
  </q-page>
</template>

<script setup lang="ts">
import { IShopOffer, IShopStore } from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { notificationHelper, goTo } from 'src/helpers';
import { ROUTE_NAME } from 'src/router';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
import OffersGroup from 'src/components/groups/OffersGroup.vue';
import MapWidget from 'src/components/widgets/MapWidget.vue';
import VendorStoreForm from 'src/vendors/components/forms/VendorStoreForm.vue';
import VendorOfferForm from 'src/vendors/components/forms/VendorOfferForm.vue';

/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
const $route = useRoute();
const $router = useRouter();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const addOfferDialog = ref(false);
const editDialog = ref(false);
const isVendor = computed(() => $route.name === ROUTE_NAME.VENDOR_STORE);
const mapDialog = ref(false);
const store = ref<IShopStore | undefined>(undefined);

/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * init7
 */
async function init() {
  if ($route.params.id && !isNaN(Number($route.params.id))) {
    const storeId = Number($route.params.id);
    notificationHelper.loading();
    try {
      const resp = await $nairdaApi.ShopStore.find(storeId);
      store.value = resp.data;
    } catch (error) {
      notificationHelper.axiosError(error, 'No encontramos la tienda');
      goTo(ROUTE_NAME.HOME);
    }
    notificationHelper.loading(false);
  }
}
/**
 * onEditOk
 */
function onEditOk(s: IShopStore) {
  store.value = s;
  editDialog.value = false;
  addOfferDialog.value = false;
}
/**
 * onAddOfferOk
 */
function onAddOfferOk(s: IShopOffer) {
  store.value?.offers?.unshift(s);
  editDialog.value = false;
  addOfferDialog.value = false;
}
/**
 * onOfferRemoved
 */
function onOfferRemoved(offerId: number) {
  if (store.value) {
    const spliceIndex = store.value.offers?.findIndex(
      (of) => of.id === offerId
    );
    if (spliceIndex) store.value.offers?.splice(spliceIndex, 1);
  }
  editDialog.value = false;
  addOfferDialog.value = false;
}
/**
 * onStoreRemoved
 */
function onStoreRemoved() {
  editDialog.value = false;
  addOfferDialog.value = false;
  void $router.push({ name: ROUTE_NAME.VENDOR_STORES });
}
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
void init();
</script>
