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
        <q-select
          v-model="form.locality_id"
          :options="allLocalities"
          label="¿Dónde te encuentras?"
          map-options
          option-label="name"
          option-value="id"
          emit-value
          :error="$v.locality_id.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.locality_id.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-select>

        <q-input
          v-model="form.map_address"
          type="text"
          label="Dirección"
          :error="$v.map_address.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.map_address.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>

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
        <q-input
          v-model="form.title"
          type="text"
          label="Nombre de la Tienda"
          :error="$v.title.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.title.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>
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
          :error="$v.category_tag.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.category_tag.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-select>
        <!-- / Category -->
        <!-- Description -->
        <q-input
          v-model="form.description"
          type="textarea"
          label="Descripción"
          :error="$v.description.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.description.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>

        <!-- / Description -->
        <!-- Image -->
        <q-file
          v-model="image"
          label="Imagen"
          use-chips
          accept=".jpg, image/*"
        />
        <!-- / Image -->
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="negative"
          icon="mdi-delete"
          outline
          label="Eliminar"
          @click="onRemove"
          v-if="$props.update"
        />
        <q-btn
          color="secondary"
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
import { injectStrict, _app, _shopCategory } from 'src/injectables';
import { computed, onBeforeMount, Ref, ref } from 'vue';
import MapWidget from 'src/components/widgets/MapWidget.vue';
import { latLng, LatLng } from 'leaflet';
import { serialize } from 'object-to-formdata';
import { Dialog } from 'quasar';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */

const $app = injectStrict(_app);
const $category = injectStrict(_shopCategory);
const $emit = defineEmits<{
  (e: 'ok', p: IShopStore): void;
  (e: 'cancel'): void;
  (e: 'removed', id: number): void;
}>();
const $props = defineProps<{ update?: IShopStore }>();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const allLocalities = computed(() => $app.allLocalities);
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
 * Validator
 */
const $v = useVuelidate(
  {
    category_tag: { required },
    description: {
      required: helpers.withMessage(
        'La descripción de la oferta ayuda a los clientes',
        required
      ),
    },
    title: {
      required: helpers.withMessage(
        'El nombre de la oferta es necesario',
        required
      ),
    },
    map_address: {
      required: helpers.withMessage('Necesitamos la dirección', required),
    },
    locality_id: {
      required: helpers.withMessage('Necesitamos la localidad', required),
    },
  },
  form as Ref<IShopStoreCreateRequest>
);
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
      locality_id: $props.update.locality?.id,
    } as IShopStoreUpdateRequest;
  } else {
    form.value = {
      category_tag: categories.value[0].tag,
      description: '',
      image: '',
      map_address: '',
      map_coordinate: DEFAULT_COORDINATES,
      open: true,
      title: '',
      locality_id: 0,
    } as IShopStoreCreateRequest;
  }
  void $category.allAction();
  void $app.listLocalities();
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */

/**
 * onRemove
 */
async function onRemove() {
  Dialog.create({
    title: 'Eliminar Oferta',
    message: '¿Está seguro que desea eliminar la oferta?',
    ok: 'Si',
    cancel: 'No',
  }).onOk(async () => {
    try {
      if ($props.update) {
        await $nairdaApi.ShopStore.destroy($props.update.id);
        $emit('removed', $props.update.id);
      }
    } catch (error) {
      notificationHelper.axiosError(error, 'No se pudo eliminar');
    }
  });
}
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
  if (await $v.value.$validate()) {
    notificationHelper.loading();
    if (image.value && form.value) {
      form.value.image = image.value;
    }
    try {
      let resp: IShopStore;

      const formData = serialize(form.value, {
        nullsAsUndefineds: true,
        booleansAsIntegers: true,
      });

      if ($props.update) {
        resp = (
          await $nairdaApi.ShopStore.update(
            $props.update.id,
            formData as unknown as IShopStoreUpdateRequest
          )
        ).data;
      } else {
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
  } else {
    notificationHelper.error(['Verifique los datos de la tienda']);
  }
}
</script>
