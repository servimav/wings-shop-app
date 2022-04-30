<template>
  <q-card>
    <q-form
      @submit.prevent="onSubmit"
      enctype="multipart/form-data"
      class="q-gutter-md"
    >
      <q-card-section class="q-gutter-y-sm">
        <q-input v-model="form.first_name" type="text" label="Nombre" />
        <q-file
          v-model="avatar"
          label="Imagen de Perfil"
          use-chips
          accept=".jpg, image/*"
        />
        <q-input v-model="form.last_name" type="text" label="Apellidos" />
        <q-input v-model="form.phone" type="tel" label="Teléfono" />
        <q-input v-model="form.address" type="text" label="Dirección" />
      </q-card-section>
      <q-card-actions>
        <q-btn color="primary" icon="mdi-check" label="Guardar" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { IUserProfile } from 'src/api';
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
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
async function onSubmit() {
  const formData = new FormData();
  const { first_name, last_name, address, phone } = form.value;
  if (avatar.value) formData.append('avatar', avatar.value);
  formData.append('first_name', first_name);
  formData.append('last_name', last_name);
  formData.append('address', address as string);
  formData.append('phone', phone as string);
  await $user.update(formData);
  $emits('completed');
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
