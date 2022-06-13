<template>
  <q-layout view="lHh Lpr lff">
    <q-page-container class="bg-secondary">
      <q-page padding class="q-pa-sm">
        <q-card-section>
          <auth-widget @auth="onAuth" />
        </q-card-section>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import AuthWidget from 'src/components/widgets/AuthWidget.vue';
import { injectStrict, _app } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { useRoute, useRouter } from 'vue-router';

/**
 * -----------------------------------------
 *	Injectable
 * -----------------------------------------
 */
const $app = injectStrict(_app);
const $route = useRoute();
const $router = useRouter();
/**
 * onAuth
 */
function onAuth() {
  if ($app.mode === 'shop_vendor')
    void $router.push({ name: ROUTE_NAME.VENDOR_HOME });
  else if ($route.redirectedFrom) void $router.push($route.redirectedFrom);
  else void $router.push({ name: ROUTE_NAME.HOME });
}
</script>
