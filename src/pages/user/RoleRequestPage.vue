<template>
  <q-page padding>
    <q-card class="no-box-shadow" v-if="role && role.name === 'user'">
      <q-card-section>
        <div class="text-h6 text-center">Solicitud de Venta</div>
        <p class="text-subtitle2">
          Le brindamos la oportunidad de llegar a muchos clientes con sus
          ofertas.
        </p>
        <p class="text-subtitle2" v-if="!allConditions">
          Para ello usted debe tener su Perfil de Usuario actualizado con todos
          los datos.
        </p>
      </q-card-section>
      <q-card-section>
        <div @click="goTo(ROUTE_NAME.USER_PROFILE)">
          <p class="bg-warning q-pa-sm text-dark" v-if="!conditions.address">
            <q-icon name="mdi-map-marker" /> Necesitamos que configure su
            dirección
          </p>
          <p class="bg-warning q-pa-sm text-dark" v-if="!conditions.phone">
            <q-icon name="mdi-phone" /> Necesitamos que configure su teléfono
          </p>
          <p class="bg-warning q-pa-sm text-dark" v-if="!conditions.email">
            <q-icon name="mdi-email-outline" /> Necesitamos que configure su
            email
          </p>
        </div>
        <user-role-request-form v-if="allConditions" />
      </q-card-section>
    </q-card>
    <q-card class="no-box-shadow" v-else>
      <q-card-section>
        <div class="text-h6">Permisos de Venta Concedidos</div>
        <div class="text-subtitle2">
          Hola {{ `${$user.profile?.first_name} ${$user.profile?.last_name}` }}
        </div>
      </q-card-section>
      <q-card-section>
        <p>
          Ya tiene permisos para vender sus productos y brindar sus servicios en
          la aplicación
        </p>
        <p>
          Recuerde mantener una conducta correcta y brindar productos de calidad
          para mantener satisfechos a sus clientes
        </p>
        <q-btn
          color="primary"
          icon="mdi-check"
          class="full-width"
          label="Continuar"
          @click="goTo(ROUTE_NAME.VENDOR_HOME)"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { Dialog } from 'quasar';
import UserRoleRequestForm from 'src/components/forms/UserRoleRequestForm.vue';
import { goTo } from 'src/helpers';
import { injectStrict, _user } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { computed, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const $router = useRouter();
const $user = injectStrict(_user);

/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const conditions = computed(() => {
  const c = {
    email: false,
    phone: false,
    address: false,
    confirmed: true,
  };
  if ($user.profile?.address) c.address = true;
  if ($user.profile?.phone) c.phone = true;
  if ($user.profile?.email) c.email = true;
  return c;
});
const allConditions = computed(
  () =>
    conditions.value.address &&
    conditions.value.confirmed &&
    conditions.value.email &&
    conditions.value.phone
);
const role = computed(() => $user.profile?.role);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * onBeforeMount
 */
onBeforeMount(() => {
  if (role.value?.name !== 'user') {
    Dialog.create({
      title: 'Permisos',
      message: 'Ya Usted tiene los permisos de venta',
      ok: true,
    }).onOk(() => {
      void $router.push({ name: ROUTE_NAME.VENDOR_HOME });
    });
  }
});
</script>
