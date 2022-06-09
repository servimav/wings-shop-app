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
          :error="$v.first_name.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.first_name.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>

        <q-input
          v-model="form.last_name"
          type="text"
          label="Apellidos"
          name="last_name"
          :error="$v.last_name.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.last_name.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>

        <q-input
          name="email"
          v-model="form.email"
          type="email"
          label="Email"
          :error="$v.email.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.email.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>

        <q-input
          name="phone"
          v-model="form.phone"
          type="tel"
          label="Teléfono"
        />

        <q-input
          name="address"
          v-model="form.address"
          type="text"
          label="Dirección"
        />

        <q-input
          name="password"
          v-model="form.password"
          type="password"
          label="Contraseña"
          :error="$v.password.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.password.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>

        <q-input
          name="password_confirmation"
          v-model="form.password_confirmation"
          type="password"
          label="Repita Contraseña"
          :error="$v.password_confirmation.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.password_confirmation.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>
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
import useVuelidate from '@vuelidate/core';
import { email, helpers, required, sameAs } from '@vuelidate/validators';
import { computed } from '@vue/reactivity';
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
  phone: undefined,
  address: undefined,
  password_confirmation: '',
  service_name: 'nairda-shop',
});
/**
 * validator
 */
const $v = useVuelidate(
  {
    email: {
      required: helpers.withMessage('El email es necesario', required),
      email: helpers.withMessage('El email no es válido', email),
    },
    first_name: {
      required: helpers.withMessage('Necesitamos su nombre', required),
    },
    last_name: {
      required: helpers.withMessage('Necesitamos sus apellidos', required),
    },
    password: {
      required: helpers.withMessage('La contraseña es necesaria', required),
    },
    password_confirmation: {
      required: helpers.withMessage('La contraseña es necesaria', required),
      sameAsPassword: helpers.withMessage(
        'La contraseña no coincide',
        sameAs(computed(() => form.value.password))
      ),
    },
  },
  form
);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * onSubmit
 */
async function onSubmit() {
  if (await $v.value.$validate()) {
    notificationHelper.loading();
    try {
      await $user.registerAction(form.value);
      $emit('auth');
    } catch (error) {
      notificationHelper.axiosError(error, 'No pudimos completar el registro');
    }
    notificationHelper.loading(false);
  }
}
</script>
