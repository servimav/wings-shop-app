<template>
  <q-form @submit.prevent="onSubmit">
    <q-card-section class="q-gutter-y-sm">
      <q-select
        v-model="form.subject"
        :options="['TCP', 'MiPYME', 'CNA', 'UBPC', 'Empresa Estatal']"
        label="Representas a:"
        required
      />
      <q-input v-model="nit" required type="text" label="NIT" />
      <q-input
        v-model="form.message"
        type="textarea"
        label="Actividades que realiza"
        required
      />
      <q-checkbox v-model="agreements">
        Acepto los
        <span class="text-accent" @click="terms">Términos y Condiciones</span>
      </q-checkbox>
    </q-card-section>
    <q-card-actions>
      <q-btn
        :disable="!canSubmit"
        color="primary"
        class="full-width"
        type="submit"
        icon="mdi-check"
        label="Enviar Solicitud"
      />
    </q-card-actions>
    <!-- Terms Dialog -->
    <q-dialog v-model="termsDialog" maximized>
      <q-card>
        <terms-section />
        <q-card-actions align="right">
          <q-btn label="Entendido" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- / Terms Dialog -->
  </q-form>
</template>

<script setup lang="ts">
import { IUserRoleRequest } from 'src/api';
import { $servimavApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { computed, ref } from 'vue';
import TermsSection from 'components/TermsSection.vue';
import { injectStrict, _user } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { useRouter } from 'vue-router';

const $user = injectStrict(_user);
const $router = useRouter();

const agreements = ref(false);
const canSubmit = computed(
  () =>
    agreements.value && form.value.message && form.value.subject && nit.value
);
const form = ref<IUserRoleRequest>({
  message: '',
  role: 'shop_vendor',
  subject: '',
});
const nit = ref('');
const termsDialog = ref(false);
/**
 * On Submit
 */
async function onSubmit() {
  notificationHelper.loading();
  try {
    form.value.message += `(NIT: ${nit.value}`;
    await $servimavApi.User.roleRequest(form.value);
    form.value = {
      message: '',
      role: 'shop_vendor',
      subject: '',
    };
    await $user.getProfile();
    notificationHelper.success(['Solicitud Recibida']);
    $router.push({ name: ROUTE_NAME.VENDOR_HOME });
  } catch (error) {
    notificationHelper.axiosError(error, 'No podemos procesar tu solicitud');
  }
  notificationHelper.loading(false);
}

function terms() {
  termsDialog.value = true;
  agreements.value = !agreements.value;
}
</script>
