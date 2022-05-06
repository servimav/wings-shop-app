<template>
  <q-card>
    <q-card-section class="q-gutter-y-sm">
      <q-select
        v-model="currentLocality"
        :options="mapLocalities"
        label="¿Dónde Estás?"
        map-options
        option-label="name"
      />
      {{ currentLocality }}
    </q-card-section>
    <q-card-actions
      ><q-btn
        color="primary"
        icon="mdi-map-marker"
        label="Confirmar"
        @click="onConfirm"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { IMapLocality } from 'src/api';
import { $nairdaApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { injectStrict, _app } from 'src/injectables';
import { onBeforeMount, ref } from 'vue';

const $app = injectStrict(_app);
const $emit = defineEmits<{ (e: 'complete'): void }>();

const mapLocalities = ref<IMapLocality[]>([]);
const currentLocality = ref<IMapLocality>();

function onConfirm() {
  $app.locality = currentLocality.value;
  $app.save();
}

/**
 * listMapLocalities
 */
async function listMapLocalities() {
  try {
    notificationHelper.loading();
    const resp = (await $nairdaApi.MapLocality.list()).data;
    mapLocalities.value = resp;
    $emit('complete');
  } catch (error) {
    notificationHelper.axiosError(error);
  }
  notificationHelper.loading(false);
}

onBeforeMount(async () => {
  await listMapLocalities();
});
</script>
