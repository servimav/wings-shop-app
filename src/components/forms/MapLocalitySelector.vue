<template>
  <q-card>
    <q-card-section class="q-gutter-y-sm">
      <q-select
        v-model="currentLocality"
        :options="mapLocalities"
        label="¿Dónde te encuentras?"
        map-options
        option-label="name"
      />
    </q-card-section>
    <q-card-actions
      ><q-btn
        color="primary"
        icon="mdi-map-marker"
        label="Confirmar"
        class="full-width"
        @click="onConfirm"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { IMapLocality } from 'src/api';
import { notificationHelper } from 'src/helpers';
import { injectStrict, _app } from 'src/injectables';
import { computed, onBeforeMount, ref } from 'vue';

const $app = injectStrict(_app);
const $emit = defineEmits<{ (e: 'complete'): void }>();

const currentLocality = ref<IMapLocality>();
const mapLocalities = computed(() => $app.allLocalities);
const selectedLocality = computed(() => $app.locality);

function onConfirm() {
  $app.locality = currentLocality.value;
  $app.save();
  notificationHelper.success([`Seleccionado ${currentLocality.value?.name}`]);
  $emit('complete');
}

/**
 * listMapLocalities
 */
async function listMapLocalities() {
  try {
    await $app.listLocalities();
    if (selectedLocality.value) currentLocality.value = selectedLocality.value;
  } catch (error) {
    notificationHelper.axiosError(error);
  }
}

onBeforeMount(async () => {
  await listMapLocalities();
});
</script>
