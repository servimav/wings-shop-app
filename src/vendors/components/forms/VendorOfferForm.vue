<template>
  <q-card>
    <q-form @submit="onSubmit" v-if="form">
      <q-card-section class="q-gutter-y-sm">
        <!-- Title -->
        <q-input v-model="form.title" type="text" label="Nombre de la oferta" />
        <!--/ Title -->
        <!-- Type -->
        <q-select
          v-model="form.type"
          :options="[
            { label: 'Producto', value: 'PRODUCT' },
            { label: 'Servicio', value: 'SERVICE' },
          ]"
          map-options
          label="Tipo de oferta"
          use-chips
        />
        <!-- / Type -->
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
        <!-- Image -->
        <q-file
          v-model="image"
          label="Imagen"
          use-chips
          accept=".jpg, image/*"
        />
        <!-- / Image -->
        <!-- Description -->
        <q-input
          v-model="form.description"
          type="textarea"
          label="Detalles de la oferta"
        />
        <!--/ Description -->
        <!-- Stock -->
        <q-select
          v-model="form.stock_type"
          :options="['INFINITY', 'LIMITED', 'SOLD_OUT']"
          label="Inventario"
        />
        <q-input
          v-model="form.stock_qty"
          type="number"
          label="Cantidad en inventario"
          v-if="form.stock_type === 'LIMITED'"
        />
        <!-- /Stock -->
        <!-- Prices -->
        <q-input
          v-model="form.vendor_price"
          type="number"
          prefix="$"
          label="Precio de Produccion"
        />
        <q-input
          v-model="form.sell_price"
          type="number"
          prefix="$"
          label="Precio de Venta"
        />
        <!-- / Prices -->
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
  IShopOffer,
  IShopOfferCreateRequest,
  IShopOfferUpdateRequest,
} from 'src/api';
import { IShopCategory } from 'src/api/types/shopCategory';
import { injectStrict, _shopCategory } from 'src/injectables';
import { computed, onBeforeMount, ref } from 'vue';
import { serialize } from 'object-to-formdata';
import { notificationHelper } from 'src/helpers';
import { $nairdaApi } from 'src/boot/axios';
import { Dialog } from 'quasar';
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const $category = injectStrict(_shopCategory);
const $emit = defineEmits<{
  (e: 'ok', p: IShopOffer): void;
  (e: 'cancel'): void;
  (e: 'removed', id: number): void;
}>();
const $props = defineProps<{ update?: IShopOffer; storeId: number }>();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const categories = computed(() => $category.all);
const form = ref<IShopOfferCreateRequest | IShopOfferUpdateRequest>();
const image = ref();

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
        await $nairdaApi.ShopOffer.destroy($props.update.id);
        $emit('removed', $props.update.id);
      }
    } catch (error) {
      notificationHelper.axiosError(error, 'No se pudo eliminar');
    }
  });
}
/**
 * onSubmit
 */
async function onSubmit() {
  if (form.value) {
    if (image.value) {
      form.value.image = image.value;
    }
    const formData = serialize(form.value, {
      nullsAsUndefineds: true,
      booleansAsIntegers: true,
    });
    notificationHelper.loading();
    try {
      let resp: IShopOffer;
      if ($props.update) {
        resp = (
          await $nairdaApi.ShopOffer.update(
            $props.update.id,
            formData as unknown as IShopOfferUpdateRequest
          )
        ).data;
      } else {
        resp = (
          await $nairdaApi.ShopOffer.create(
            formData as unknown as IShopOfferCreateRequest
          )
        ).data;
      }
      $emit('ok', resp);
    } catch (error) {
      notificationHelper.axiosError(error, 'No se guardo la oferta');
    }
    notificationHelper.loading(false);
  }
}
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
onBeforeMount(() => {
  if ($props.update) {
    form.value = {
      category_tag: ($props.update.category as IShopCategory).tag,
      description: $props.update.description,
      sell_price: $props.update.sell_price,
      stock_qty: $props.update.stock_qty,
      stock_type: $props.update.stock_type,
      store_id: $props.storeId,
      title: $props.update.title,
      type: $props.update.type,
      vendor_price: $props.update.vendor_price,
    } as IShopOfferUpdateRequest;
  } else {
    form.value = {
      category_tag: categories.value[0].tag,
      description: '',
      image: '',
      sell_price: 0,
      stock_qty: 0,
      stock_type: 'INFINITY',
      store_id: $props.storeId,
      title: '',
      type: 'PRODUCT',
      vendor_price: 0,
    } as IShopOfferCreateRequest;
  }
  void $category.allAction();
});
</script>
