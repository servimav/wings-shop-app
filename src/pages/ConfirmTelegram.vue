<template>
  <q-page padding class="q-gutter-y-sm">
    <title-widget :data="{ title: 'Vincular con Telegram' }" />
    <telegram-access class="q-pt-sm" :code="code" />
  </q-page>
</template>

<script setup lang="ts">
import TelegramAccess from 'src/components/forms/TelegramAccess.vue';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const $route = useRoute();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const code = computed(() =>
  $route.query.code ? String($route.query.code) : undefined
);
</script>
