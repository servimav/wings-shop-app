<template>
  <router-view />
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { $app, $user, _app, _user } from 'src/injectables';
import { isAuth } from './helpers';

provide(_app, $app);
provide(_user, $user);

$user.load();
if (isAuth()) $user.getProfile();
</script>
