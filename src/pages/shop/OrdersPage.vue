<template>
  <q-page padding>
    <section class="q-gutter-y-sm">
      <div v-for="(order, oKey) in orders" :key="`order-${oKey}`">
        <order-widget :order="order" />
      </div>

      <widget-skeleton order v-if="!orders.length && isLoading" />
      <title-widget
        :data="{ title: 'No tiene pedidos' }"
        v-if="!orders.length && !isLoading"
      />
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';
import { injectStrict, _shopOrder } from 'src/injectables';
import OrderWidget from 'src/components/widgets/shop/OrderWidget.vue';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
import WidgetSkeleton from 'src/components/widgets/WidgetSkeleton.vue';
import { isAuth, notificationHelper } from 'src/helpers';

const $order = injectStrict(_shopOrder);

const isLoading = ref(true);
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
    isLoading.value = false;
  }
});
</script>
