<template>
  <q-card>
    <q-form @submit="onSubmit" v-if="form">
      <q-card-section class="q-gutter-y-sm">
        <!-- Title -->
        <q-input
          v-model="form.title"
          type="text"
          label="Nombre de la oferta"
          :error="$v.title.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.title.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>
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
          :error="$v.type.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.type.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-select>
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
        <!-- Image -->
        <q-file
          v-model="image"
          label="Imagen"
          use-chips
          accept=".jpg, image/*"
          bottom-slots
        />
        <!-- / Image -->
        <!-- Description -->
        <q-input
          v-model="form.description"
          type="textarea"
          label="Detalles de la oferta"
          :error="$v.description.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.description.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>
        <!--/ Description -->
        <!-- Stock -->
        <q-select
          v-model="form.stock_type"
          :options="[
            { label: 'Ilimitado', value: 'INFINITY' },
            { label: 'Limitado', value: 'LIMITED' },
            { label: 'Agotado', value: 'SOLD_OUT' },
          ]"
          map-options
          emit-value
          label="Inventario"
          :error="$v.stock_type.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.stock_type.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-select>
        <q-input
          v-model="form.stock_qty"
          type="number"
          label="Cantidad en inventario"
          v-if="form.stock_type === 'LIMITED'"
          :error="$v.stock_qty.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.stock_qty.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>
        <!-- /Stock -->
        <!-- Prices -->
        <q-input
          v-model="form.vendor_price"
          type="number"
          prefix="$"
          label="Precio de Produccion"
          :error="$v.vendor_price.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.vendor_price.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>
        <q-input
          v-model="form.sell_price"
          type="number"
          prefix="$"
          label="Precio de Venta"
          :error="$v.sell_price.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.sell_price.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>
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
import { computed, onBeforeMount, Ref, ref } from 'vue';
import { serialize } from 'object-to-formdata';
import { notificationHelper } from 'src/helpers';
import { $nairdaApi } from 'src/boot/axios';
import { Dialog } from 'quasar';
import useVuelidate from '@vuelidate/core';
import { required, numeric, integer, helpers } from '@vuelidate/validators';
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
 * validator
 */
const $v = useVuelidate(
  {
    category_tag: { required },
    type: { required },
    description: {
      required: helpers.withMessage(
        'La descripción de la oferta ayuda a los clientes',
        required
      ),
    },
    sell_price: { required, numeric },
    stock_type: { required },
    stock_qty: { integer },
    title: {
      required: helpers.withMessage(
        'El nombre de la oferta es necesario',
        required
      ),
    },
    vendor_price: { required, numeric },
  },
  form as Ref<IShopOfferCreateRequest>
);
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
  if (form.value && (await $v.value.$validate())) {
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
  } else {
    notificationHelper.error(['Revise los datos']);
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
