<template>
  <q-card class="no-box-shadow">
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="q-gutter-y-sm">
        <!-- Contact email -->
        <q-input v-model="form.email" required type="email" label="Su Email" />
        <!-- / Contact email -->
        <!-- Contact phone -->
        <q-input v-model="form.phone" required type="tel" label="Su Teléfono" />
        <!-- / Contact phone -->
        <!-- Contact Message -->
        <q-input
          v-model="form.message"
          required
          type="textarea"
          label="Mensaje"
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
import { injectStrict, _user } from 'src/injectables';
import { computed, onBeforeMount, ref } from 'vue';
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const $user = injectStrict(_user);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const form = ref<{ email: string; phone: string; message: string }>({
  email: '',
  message: '',
  phone: '',
});
const profile = computed(() => $user.profile);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * On Submit
 */
async function onSubmit() {
  console.log('onSubmit');
}
/**
 * On Before Mount
 */
onBeforeMount(() => {
  if (profile.value) {
    form.value.email = profile.value.email;
    if (profile.value.phone) form.value.phone = profile.value.phone;
  }
});
</script>
