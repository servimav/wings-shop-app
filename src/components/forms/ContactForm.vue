<template>
  <q-card class="no-box-shadow">
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="q-gutter-y-sm">
        <!-- Contact email -->
        <!-- <q-input v-model="form.email" required type="email" label="Su Email" /> -->
        <!-- / Contact email -->
        <!-- Contact phone -->
        <!-- <q-input v-model="form.phone" required type="tel" label="Su Teléfono" /> -->
        <!-- / Contact phone -->
        <!-- Contact Message -->
        <q-input
          v-model="form.message"
          required
          type="textarea"
          label="Deje su mensaje"
        />
        <!-- / Contact Message -->
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="primary"
          type="submit"
          class="full-width"
          label="Enviar"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { $servimavApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { ref } from 'vue';
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const form = ref<{ message: string }>({
  message: '',
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * On Submit
 */
async function onSubmit() {
  notificationHelper.loading();
  try {
    await $servimavApi.User.message(form.value.message);
    notificationHelper.success(['Mensaje enviado']);
    form.value.message = '';
  } catch (error) {
    notificationHelper.axiosError(error);
  }
  notificationHelper.loading(false);
}
</script>
