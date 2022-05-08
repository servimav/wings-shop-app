<template>
  <q-card>
    <q-form
      @submit.prevent="onSubmit"
      enctype="multipart/form-data"
      class="q-gutter-md"
    >
      <q-card-section class="q-gutter-y-sm">
        <q-input
          v-model="form.first_name"
          type="text"
          label="Nombre"
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
          :error="$v.last_name.$error"
          bottom-slots
        >
          <template v-slot:error>
            <div v-for="e of $v.last_name.$errors" :key="e.$uid">
              {{ e.$message }}
            </div>
          </template>
        </q-input>

        <q-file
          v-model="avatar"
          label="Imagen de Perfil"
          use-chips
          accept=".jpg, image/*"
        />

        <q-input v-model="form.phone" type="tel" label="Teléfono" />

        <q-input v-model="form.address" type="text" label="Dirección" />
      </q-card-section>
      <q-card-actions>
        <q-btn
          color="negative"
          outline
          icon="mdi-cancel"
          label="Cancelar"
          @click="$emits('completed')"
        />
        <q-btn color="primary" icon="mdi-check" label="Guardar" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, required } from '@vuelidate/validators';
import { IUserProfile } from 'src/api';
import { notificationHelper } from 'src/helpers';
import { injectStrict, _user } from 'src/injectables';
import { ref } from 'vue';

/**
 * -----------------------------------------
 *	Injectable
 * -----------------------------------------
 */
const $emits = defineEmits<{ (e: 'completed'): void }>();
const $props = defineProps<{ profile: IUserProfile }>();
const $user = injectStrict(_user);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const form = ref<Omit<IUserProfile, 'role' | 'email'>>({
  avatar: '',
  first_name: '',
  id: 0,
  last_name: '',
  address: '',
  phone: '',
});
const avatar = ref();
/**
 * validators
 */
const $v = useVuelidate(
  {
    first_name: {
      required: helpers.withMessage('Necesitamos su nombre', required),
    },
    last_name: {
      required: helpers.withMessage('Necesitamos sus apellidos', required),
    },
  },
  form
);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
async function onSubmit() {
  if (await $v.value.$validate()) {
    notificationHelper.loading();
    const formData = new FormData();
    const { first_name, last_name, address, phone } = form.value;
    if (avatar.value) formData.append('avatar', avatar.value);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('address', address ? address : '');
    formData.append('phone', phone ? phone : '');
    await $user.update(formData);
    notificationHelper.loading(false);

    $emits('completed');
  }
}
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
form.value = {
  avatar: $props.profile.avatar,
  first_name: $props.profile.first_name,
  id: $props.profile.id,
  last_name: $props.profile.last_name,
  address: $props.profile.address,
  phone: $props.profile.phone,
};
</script>
