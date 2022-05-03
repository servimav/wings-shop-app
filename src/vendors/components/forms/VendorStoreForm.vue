<template>
  <q-card>
    <q-form @submit="onSubmit" class="q-gutter-md" v-if="form">
      <q-card-section class="q-gutter-y-sm">
        <div>
          <q-toggle
            v-model="form.open"
            :label="`Tienda ${form.open ? 'Abierta' : 'Cerrada'}`"
            color="green"
          />
        </div>

        <!-- map_address -->
        <q-input v-model="form.map_address" type="text" label="Dirección" />
        <q-chip
          class="glossy"
          clickable
          icon="mdi-map-marker"
          label="Marcar en el Mapa"
          @click="showMap = true"
        />
        <q-card
          class="no-box-shadow full-width"
          style="height: 20rem"
          v-if="showMap"
        >
          <map-widget
            :initial-markers="initialMarkers"
            :button="false"
            @add-position="setCoordinate"
          />
        </q-card>
        <!-- / map_address -->
        <!-- title -->
        <q-input v-model="form.title" type="text" label="Nombre de la Tienda" />
        <!-- / title -->
        <!-- Category -->
        <q-select
          v-model="form.category_tag"
          :options="categories"
          emit-value
          map-options
          option-label="title"
          option-value="tag"
          label="Categoria"
          use-chips
        />
        <!-- / Category -->
        <!-- Description -->
        <q-input
          v-model="form.description"
          type="textarea"
          label="Descripción"
        />
        <!-- / Description -->
        <q-file
          v-model="image"
          label="Imagen"
          use-chips
          accept=".jpg, image/*"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="negative"
          outline
          label="Cancelar"
          @click="$emit('cancel')"
        />
        <q-btn color="primary" label="Guardar" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import {
  IShopStore,
  IShopStoreCreateRequest,
  IShopStoreUpdateRequest,
} from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { notificationHelper, DEFAULT_COORDINATES } from 'src/helpers';
import { injectStrict, _shopCategory } from 'src/injectables';
import { computed, onBeforeMount, ref } from 'vue';
import MapWidget from 'src/components/widgets/MapWidget.vue';
import { latLng, LatLng } from 'leaflet';
import { serialize } from 'object-to-formdata';
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */

const $category = injectStrict(_shopCategory);
const $emit = defineEmits<{
  (e: 'ok', p: IShopStore): void;
  (e: 'cancel'): void;
}>();
const $props = defineProps<{ update?: IShopStore }>();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const categories = computed(() => $category.all);
const form = ref<IShopStoreCreateRequest | IShopStoreUpdateRequest>();
const image = ref<File>();
const initialMarkers = computed(() =>
  $props.update && form.value && form.value.map_coordinate
    ? [latLng(form.value.map_coordinate.lat, form.value.map_coordinate.lng)]
    : []
);
const showMap = ref(false);
/**
 * -----------------------------------------
 *	Lifecycle
 * -----------------------------------------
 */
/**
 * onBeforeMount
 */
onBeforeMount(() => {
  if ($props.update) {
    form.value = {
      description: $props.update.description,
      map_coordinate: $props.update.map_coordinate,
      category_tag: $props.update.category?.tag,
      map_address: $props.update.map_address,
      open: $props.update.open,
      title: $props.update.title,
    } as IShopStoreUpdateRequest;
  } else {
    form.value = {
      category_tag: '',
      description: '',
      image: '',
      map_address: '',
      map_coordinate: DEFAULT_COORDINATES,
      open: true,
      title: '',
    } as IShopStoreCreateRequest;
  }
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * Set Coordinate
 * @param p
 */
function setCoordinate(p: LatLng) {
  setTimeout(() => {
    if (form.value) {
      form.value.map_coordinate = {
        lat: p.lat,
        lng: p.lng,
      };
      showMap.value = false;
    }
  }, 500);
}
/**
 * onSubmit
 */
async function onSubmit() {
  notificationHelper.loading();
  if (image.value && form.value) {
    form.value.image = image.value;
  }
  try {
    let resp: IShopStore;
    if ($props.update) {
      const formData = serialize(form.value, {
        nullsAsUndefineds: true,
        booleansAsIntegers: true,
      });

      resp = (
        await $nairdaApi.ShopStore.update(
          $props.update.id,
          formData as unknown as IShopStoreUpdateRequest
        )
      ).data;
    } else {
      const formData = serialize(form.value, {
        nullsAsUndefineds: true,
        booleansAsIntegers: true,
      });
      resp = (
        await $nairdaApi.ShopStore.create(
          formData as unknown as IShopStoreCreateRequest
        )
      ).data;
    }
    $emit('ok', resp);
    notificationHelper.success(['Guardado correctamente']);
  } catch (error) {
    notificationHelper.axiosError(error);
  }
  notificationHelper.loading(false);
}
</script>
