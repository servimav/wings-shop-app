<template>
  <q-form @submit.prevent="onSubmit">
    <q-card-section class="q-gutter-y-sm">
      <q-select
        v-model="form.subject"
        :options="['Soy TCP', 'Represento MiPYME']"
        label="Cuentanos sobre ti"
      />

      <q-input
        v-model="form.message"
        type="textarea"
        label="Actividades que realiza"
      />
      <q-checkbox v-model="agreements">
        Acepto los
        <span class="text-accent" @click="terms">Términos y Condiciones</span>
      </q-checkbox>
    </q-card-section>
    <q-card-actions>
      <q-btn
        :disable="!agreements"
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
import { $nairdaApi } from 'src/boot/axios';
import { notificationHelper } from 'src/helpers';
import { ref } from 'vue';
import TermsSection from 'components/TermsSection.vue';
import { injectStrict, _user } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { useRouter } from 'vue-router';

const $user = injectStrict(_user);
const $router = useRouter();

const agreements = ref(false);
const form = ref<IUserRoleRequest>({
  message: '',
  role: 'shop_vendor',
  subject: '',
});
const termsDialog = ref(false);
/**
 * On Submit
 */
async function onSubmit() {
  notificationHelper.loading();
  try {
    await $nairdaApi.User.roleRequest(form.value);
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
