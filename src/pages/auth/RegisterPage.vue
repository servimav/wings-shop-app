<template>
  <q-page padding>
    <q-card class="register-card absolute-center">
      <q-card-section class="text-center text-grey-9">
        <div class="text-h6">Registrar Usuario</div>
      </q-card-section>
      <q-form @submit.prevent="onSubmit">
        <q-card-section class="q-gutter-y-md">
          <q-input v-model="form.first_name" type="text" label="Nombre" />
          <q-input v-model="form.last_name" type="text" label="Apellidos" />
          <q-input v-model="form.email" type="email" label="Email" />
          <q-input v-model="form.password" type="password" label="Contrasena" />
          <q-input
            v-model="form.password_confirmation"
            type="password"
            label="Contrasena"
          />
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="full-width"
            color="primary"
            text-color="dark"
            label="Enviar"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { IUserAuthRegisterRequest } from 'src/api';
import { notificationHelper } from 'src/helpers';
import { injectStrict, _user } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
const $user = injectStrict(_user);
const $router = useRouter();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const form = ref<IUserAuthRegisterRequest>({
  email: '',
  password: '',
  service_name: 'MainApp',
  first_name: '',
  last_name: '',
  password_confirmation: '',
});

/**
 * -----------------------------------------
 *	methods
 * -----------------------------------------
 */
async function onSubmit() {
  notificationHelper.loading();
  try {
    await $user.registerAction(form.value);
    void $router.push({ name: ROUTE_NAME.HOME });
  } catch (error) {
    notificationHelper.error([
      'No podemos registrar el usuario. Intente mas tarde',
    ]);
  }
  notificationHelper.loading(false);
}
</script>

<style scoped>
.register-card {
  max-width: 25rem;
  min-width: 20rem;
}
</style>
