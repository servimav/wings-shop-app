<template>
  <q-card class="login-card">
    <q-card-section class="text-center text-grey-9">
      <div class="text-body1">
        Inicia sesión para vivir una mejor experiencia
      </div>
    </q-card-section>
    <q-form @submit.prevent="login">
      <q-card-section class="q-gutter-y-md">
        <q-input
          name="email"
          v-model="loginForm.email"
          type="email"
          label="Email"
        />
        <q-input
          name="password"
          v-model="loginForm.password"
          type="password"
          label="Contraseña"
        />
      </q-card-section>
      <q-card-section
        class="text-primary cursor-pointer"
        @click="$emit('toggle')"
      >
        No tengo cuenta
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
import { notificationHelper } from 'src/helpers';
import { IUserAuthLoginRequest } from 'src/api';
import { injectStrict, _user } from 'src/injectables';

/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
const $emit = defineEmits<{ (e: 'toggle'): void; (e: 'auth'): void }>();
const $user = injectStrict(_user);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const loginForm = ref<IUserAuthLoginRequest>({
  email: '',
  password: '',
  service_name: 'MainApp',
  auth_mode: 'user',
});

/**
 * -----------------------------------------
 *	methods
 * -----------------------------------------
 */
/**
 * login
 */
async function login() {
  notificationHelper.loading();
  try {
    await $user.loginAction(loginForm.value);
    notificationHelper.success([`Bienvenido ${$user.profile?.first_name}`]);
    $emit('auth');
  } catch (error) {
    notificationHelper.error(['Credenciales incorrectas']);
  }
  notificationHelper.loading(false);
}
</script>

<style scoped>
.login-card {
  max-width: 25rem;
  min-width: 20rem;
}
</style>
