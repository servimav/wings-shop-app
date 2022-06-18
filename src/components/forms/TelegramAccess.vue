<template>
  <q-card>
    <q-form @submit="onSubmit">
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="form" type="text" label="Codigo de Acceso" />
      </q-card-section>
      <q-card-actions>
        <q-btn
          class="full-width"
          icon="mdi-check"
          label="Confirmar"
          type="submit"
          color="positive"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { $servimavApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { onBeforeMount, ref } from 'vue';

const $props = defineProps<{ code?: string }>();

const form = ref('');
/**
 * On Submit
 */
async function onSubmit() {
  try {
    await $servimavApi.PublicityAnnouncement.confirmTelgramCode(form.value);
  } catch (error) {
    notificationHelper.axiosError(error);
  }
}
/**
 * On Before Mount
 */
onBeforeMount(() => {
  if ($props.code) form.value = $props.code;
});
</script>
