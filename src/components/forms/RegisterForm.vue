<template>
  <q-card>
    <q-card-section class="text-center text-grey-9">
      <div class="text-body1">
        Inicia sesión para vivir una mejor experiencia
      </div>
    </q-card-section>
    <q-form @submit.prevent="onSubmit">
      <q-card-section class="q-gutter-y-md">
        <q-input
          v-model="form.first_name"
          type="text"
          label="Nombre"
          name="name"
        />
        <q-input
          v-model="form.last_name"
          type="text"
          label="Apellidos"
          name="last_name"
        />
        <q-input name="email" v-model="form.email" type="email" label="Email" />

        <q-input
          name="password"
          v-model="form.password"
          type="password"
          label="Contraseña"
        />
        <q-input
          name="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          label="Repita Contraseña"
        />
      </q-card-section>
      <q-card-section
        class="text-primary cursor-pointer"
        @click="$emit('toggle')"
      >
        Ya tengo cuenta
      </q-card-section>
      <q-card-actions>
        <q-btn
          class="full-width"
          color="primary"
          label="Iniciar"
          type="submit"
        />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { injectStrict, _user } from 'src/injectables';
import { IUserAuthRegisterRequest } from 'src/api';
import { notificationHelper } from 'src/helpers';
/**
 * -----------------------------------------
 *	Setup
 * -----------------------------------------
 */
const $emit = defineEmits<{ (e: 'toggle'): void; (e: 'auth'): void }>();
const $user = injectStrict(_user);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const form = ref<IUserAuthRegisterRequest>({
  email: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirmation: '',
  service_name: 'nairda-shop',
});
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * onSubmit
 */
async function onSubmit() {
  notificationHelper.loading();
  try {
    await $user.registerAction(form.value);
    $emit('auth');
  } catch (error) {
    notificationHelper.axiosError(error, 'No pudimos completar el registro');
  }
  notificationHelper.loading(false);
}
</script>
