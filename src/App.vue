<template>
  <router-view />
</template>

<script setup lang="ts">
import { provide } from 'vue';
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

provide(_app, $app);
provide(_user, $user);
provide(_map, $mapInjectable);
provide(_shopCategory, $shopCategory);
provide(_shopOrder, $shopOrderInjectable);
provide(_shopCart, $shopCartInjectable);
</script>
