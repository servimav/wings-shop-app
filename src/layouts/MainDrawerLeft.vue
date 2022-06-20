<template>
  <q-drawer
    :model-value="drawerLeft"
    @update:model-value="updateDrawerleft"
    show-if-above
    bordered
  >
    <div class="q-pa-md text-grey-9 text-center" v-if="isAuth()">
      Hola, {{ name }}
    </div>
    <q-list class="rounded-borders text-grey-9">
      <!-- HOME -->
      <q-item exact clickable :to="{ name: ROUTE_NAME.HOME }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-home" text-color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Inicio</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / HOME -->

      <!-- Categories -->
      <q-expansion-item :content-inset-level="0.25" v-if="categories.length">
        <template v-slot:header>
          <q-item-section avatar top>
            <q-avatar size="md" icon="mdi-apps" text-color="primary" />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">Categorías</q-item-label>
          </q-item-section>
        </template>

        <q-expansion-item
          expand-icon-class="text-transparent"
          :expand-separator="false"
          v-for="(cat, cKey) in categories"
          :key="`cat-${cat.tag}-${cKey}`"
          @click="goToctegory(cat.tag)"
        >
          <template v-slot:header>
            <q-item-section avatar top>
              <q-avatar size="md" :icon="cat.icons.mdi" text-color="primary" />
            </q-item-section>

            <q-item-section>
              <q-item-label lines="1">{{ cat.title }}</q-item-label>
            </q-item-section>
          </template>
        </q-expansion-item>
      </q-expansion-item>
      <!-- / Categories -->

      <!-- Orders -->
      <q-item
        exact
        clickable
        :to="{ name: ROUTE_NAME.SHOP_ORDERS }"
        v-if="isAuth()"
      >
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-gift" text-color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Mis Pedidos</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Orders -->
      <!-- Profile -->
      <q-item
        exact
        clickable
        :to="{ name: ROUTE_NAME.USER_PROFILE }"
        v-if="isAuth()"
      >
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-account" text-color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Mi Perfil</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Profile -->
      <!-- Vendor Mode -->
      <q-item clickable @click="vendorMode" v-if="isAuth()">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-account-convert" text-color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Modo Ventas</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / Vendor Mode -->

      <!-- About -->
      <q-item exact clickable :to="{ name: ROUTE_NAME.ABOUT }">
        <q-item-section avatar top>
          <q-avatar size="md" icon="mdi-information" text-color="primary" />
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">Sobre Nosotros</q-item-label>
        </q-item-section>
      </q-item>
      <!-- / About -->

      <!-- Logout -->
      <q-item clickable v-if="isAuth()" @click="logout">
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
import { isAuth } from 'src/helpers';
import { injectStrict, _app, _shopCategory, _user } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
/**
 * -----------------------------------------
 *	Injectables
 * -----------------------------------------
 */
const $app = injectStrict(_app);
const $categories = injectStrict(_shopCategory);
const $router = useRouter();
const $user = injectStrict(_user);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */

const categories = computed(() => $categories.available);
const drawerLeft = computed(() => $app.drawerLeft);

const name = computed(() => `${$user.profile?.first_name}`);
/**
 * goToctegory
 * @param cat
 */
function goToctegory(cat: string) {
  void $router.push({ name: ROUTE_NAME.SHOP_CATEGORY, query: { tag: cat } });
  updateDrawerleft(false);
}
/**
 * logout
 */
function logout() {
  void $router.push({ name: ROUTE_NAME.AUTH });
  $user.logout();
  updateDrawerleft(false);
}
/**
 * updateDrawerleft
 * @param open
 */
function updateDrawerleft(open: boolean) {
  $app.drawerLeft = open;
}
/**
 * vendorMode
 */
function vendorMode() {
  if ($user.isVendor || $user.isAdmin) {
    Dialog.create({
      title: 'Cambiar Modo',
      class: 'text-justify',
      message: '¿Desea cambiar al Modo Ventas?',
      ok: 'Si',
      cancel: 'No',
    }).onOk(() => {
      $app.setMode('shop_vendor');
      void $router.push({ name: ROUTE_NAME.VENDOR_HOME });
    });
  } else {
    Dialog.create({
      title: 'Solicitud de ventas',
      message: `${name.value}, usted no tiene permiso de ventas. ¿Desea solicitar permiso a los Administradores?`,
      class: 'text-justify',
      ok: 'Solicitar',
      cancel: 'Cancelar',
    }).onOk(() => {
      void $router.push({ name: ROUTE_NAME.USER_ROLE_REQUEST });
      updateDrawerleft(false);
    });
  }
}
</script>
