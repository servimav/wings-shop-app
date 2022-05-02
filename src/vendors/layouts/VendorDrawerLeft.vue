<template>
  <q-drawer
    :model-value="drawerLeft"
    @update:model-value="updateDrawerleft"
    show-if-above
    bordered
  >
    <div class="q-pa-md text-grey-9 text-center">Hola, {{ name }}</div>
    <q-list class="rounded-borders text-grey-9">
      <!-- HOME -->
      <q-item clickable :to="{ name: ROUTE_NAME.VENDOR_HOME }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-home" text-color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Inicio</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / HOME -->

      <!-- Vendor Mode -->
      <q-item clickable @click="userMode">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-account-convert" text-color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Modo Cliente</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Vendor Mode -->
      <!-- Logout -->
      <q-item clickable @click="logout">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-exit-to-app" text-color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Salir</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Logout -->
    </q-list>
  </q-drawer>
</template>

<script lang="ts" setup>
import { Dialog } from 'quasar';
import { injectStrict, _app, _user } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
/**
 * -----------------------------------------
 *	Injectables
 * -----------------------------------------
 */
const $app = injectStrict(_app);
const $router = useRouter();
const $user = injectStrict(_user);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const drawerLeft = computed(() => $app.drawerLeft);
const name = computed(() => `${$user.profile?.first_name}`);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * logout
 */
function logout() {
  void $router.push({ name: ROUTE_NAME.HOME });
  $user.logout();
}
/**
 * updateDrawerleft
 * @param open
 */
function updateDrawerleft(open: boolean) {
  $app.drawerLeft = open;
}
/**
 * userMode
 */
function userMode() {
  Dialog.create({
    title: 'Cambiar modo',
    message: '¿Desea cambiar a modo Cliente?',
    ok: 'Si',
    cancel: 'No',
  }).onOk(() => {
    $app.mode === 'shop_vendor';
    void $router.push({ name: ROUTE_NAME.HOME });
  });
}
</script>
