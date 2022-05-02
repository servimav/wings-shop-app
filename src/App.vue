<template>
  <router-view />
</template>

<script setup lang="ts">
import { provide, onBeforeMount } from 'vue';
import {
  $app,
  $mapInjectable,
  $shopCartInjectable,
  $shopCategory,
  $shopOrderInjectable,
  $user,
  _app,
  _map,
  _shopCart,
  _shopCategory,
  _shopOrder,
  _user,
} from 'src/injectables';
import { isAuth } from './helpers';
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
import { ROUTE_NAME } from './router';

const $router = useRouter();

provide(_app, $app);
provide(_user, $user);
provide(_map, $mapInjectable);
provide(_shopCategory, $shopCategory);
provide(_shopOrder, $shopOrderInjectable);
provide(_shopCart, $shopCartInjectable);

const appMode = computed(() => $app.mode);

/**
 * onBeforeMount
 */
onBeforeMount(() => {
  void $app.load();
  $user.load();
  if (isAuth()) $user.getProfile();
  if (appMode.value === 'shop_vendor') {
    if ($user.isVendor) void $router.push({ name: ROUTE_NAME.VENDOR_HOME });
    else $app.mode = 'user';
  }
});
</script>
