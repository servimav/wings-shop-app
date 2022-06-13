<template>
  <q-page padding>
    <section class="q-gutter-y-sm">
      <div v-for="(order, oKey) in orders" :key="`order-${oKey}`">
        <order-widget :order="order" />
      </div>

      <title-widget
        :data="{ title: 'No tiene pedidos' }"
        v-if="!orders.length"
      />
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue';
import { injectStrict, _shopOrder } from 'src/injectables';
import OrderWidget from 'src/components/widgets/shop/OrderWidget.vue';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
import { isAuth, notificationHelper } from 'src/helpers';

const $order = injectStrict(_shopOrder);

const orders = computed(() => $order.myOrders);
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
onBeforeMount(async () => {
  if (isAuth()) {
    try {
      await $order.list();
    } catch (error) {
      notificationHelper.axiosError(error);
    }
  }
});
</script>
