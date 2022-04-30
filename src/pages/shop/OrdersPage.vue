<template>
  <q-page padding>
    <section class="q-gutter-y-sm">
      <div v-for="(order, oKey) in orders" :key="`order-${oKey}`">
        <order-widget :order="order" />
      </div>
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { injectStrict, _shopOrder } from 'src/injectables';
import OrderWidget from 'src/components/widgets/shop/OrderWidget.vue';
import { isAuth } from 'src/helpers';

const $order = injectStrict(_shopOrder);
const orders = computed(() => $order.myOrders);
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */
if (isAuth()) {
  void $order.list();
}
</script>
