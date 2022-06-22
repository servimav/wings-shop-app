<template>
  <q-page padding class="q-gutter-y-sm">
    <title-widget :data="{ title: 'Vincular con Telegram' }" />
    <telegram-access class="q-pt-sm" :code="code" @completed="onCompleted" />
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import TelegramAccess from 'src/components/forms/TelegramAccess.vue';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
import { ROUTE_NAME } from 'src/router';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const $route = useRoute();
const $router = useRouter();
const $q = useQuasar();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const code = computed(() =>
  $route.query.code ? String($route.query.code) : undefined
);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function onCompleted() {
  $q.dialog({
    title: 'Vincular con Telegram',
    message: 'Su Cuenta ha sido vinculada correctamente con Telegram',
    ok: 'Continuar',
  }).onOk(() => {
    void $router.push({ name: ROUTE_NAME.VENDOR_HOME });
  });
}
</script>
