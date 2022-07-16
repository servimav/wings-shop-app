<template>
  <q-page padding class="q-gutter-y-sm">
    <!-- Basic Data -->
    <section class="q-gutter-y-sm">
      <title-widget :data="{ title: 'Estadísticas' }" />

      <q-card>
        <q-card-section>
          <div class="text-body1 text-center">Cantidades</div>
          <q-chip
            class="glossy"
            icon="mdi-store"
            :label="`${basicStats?.count.stores} Tiendas`"
          />
          <q-chip
            class="glossy"
            icon="mdi-gift"
            :label="`${basicStats?.count.offers} Ofertas`"
          />
          <q-chip
            class="glossy"
            icon="mdi-truck-delivery"
            :label="`${basicStats?.count.orders} Pedidos`"
          />
        </q-card-section>
        <q-card-section>
          <div class="text-body1 text-center">Ganancias</div>
          <q-chip
            class="glossy"
            icon="mdi-cash"
            :label="`$${Number(basicStats?.earn.offers).toFixed(2)} Ventas`"
          />
          <q-chip
            class="glossy"
            icon="mdi-cash"
            :label="`$${Number(basicStats?.earn.shipping).toFixed(2)} Envíos`"
          />
        </q-card-section>
      </q-card>
    </section>
    <!-- / Basic Data -->
  </q-page>
</template>

<script setup lang="ts">
import { IShopStatsBasic } from 'src/api';
import { $servimavApi } from 'src/boot/axios';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
import { notificationHelper } from 'src/helpers';
import { onBeforeMount, ref } from 'vue';
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const basicStats = ref<IShopStatsBasic>();
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
/**
 * On Before Mount
 */
onBeforeMount(async () => {
  try {
    basicStats.value = (await $servimavApi.ShopStats.basic()).data;
  } catch (error) {
    notificationHelper.axiosError(error);
  }
});
</script>
