<template>
  <q-page padding>
    <section v-if="orders.length">
      <title-widget :data="{ title: 'Nuevos Pedidos' }" />
      <div class="row q-col-gutter-sm q-mt-xs">
        <div
          class="col-xs-12"
          v-for="(o, k) in orders"
          :key="`order-on-process-${o.id}-k${k}`"
        >
          <order-widget :order="o" as-vendor />
        </div>
      </div>
    </section>

    <!-- Default View  -->
    <section v-else class="q-gutter-y-sm">
      <title-widget :data="{ title: 'Modo Vendedor' }" />
      <q-card>
        <q-card-section>
          <div class="text-body1 text-center">
            ¿Qué puedes hacer con nosotros?
          </div>
        </q-card-section>
        <q-card-section class="text-justify">
          <!-- Store -->
          <p>
            <q-chip
              clickable
              @click="goTo(ROUTE_NAME.VENDOR_STORES)"
              class="glossy"
              icon="mdi-store"
              label="Administrar Tienda Virtual"
            />
          </p>
          <p>
            Crea tu propia Tienda Virtual para publicar tus ofertas y llegar a
            más clientes
          </p>
          <!-- / Store -->

          <!-- Ann -->
          <p>
            <q-chip
              clickable
              @click="onAdminAnnClick"
              class="glossy"
              icon="mdi-arrange-send-backward"
              label="Administrar Anuncios"
            />
          </p>
          <p>
            Si tienes ofertas que quieres darle más visibilidad y alcance
            anunciarla con nuestra red de anuncios. Contamos con publicidad
            automatizada en redes sociales y en esta aplicación.
          </p>
          <!-- / Ann -->

          <!-- Stats -->
          <p>
            <q-chip
              clickable
              @click="goTo(ROUTE_NAME.VENDOR_STATS)"
              class="glossy"
              icon="mdi-chart-bar"
              label="Estadísticas"
            />
          </p>
          <p>
            Consulta tus datos de venta y el alcance que han tenido tus ofertas
          </p>
          <!-- / Stats -->

          <!-- Help -->
          <p>
            <q-chip
              clickable
              @click="openHelp"
              class="glossy"
              icon="mdi-help-circle-outline"
              label="Ayuda"
            />
          </p>
          <p>
            Consulta nuestros materiales de ayuda para que aprendas a ganar con
            Wings Shop
          </p>
          <!-- / Help -->

          <!-- Contact -->
          <p>
            <q-chip
              clickable
              @click="goTo(ROUTE_NAME.VENDOR_HELP)"
              class="glossy"
              icon="mdi-email-outline"
              label="Contacto"
            />
          </p>
          <p>
            Estamos disponibles para ayudarte en lo que necesites para mejorar
            tus ventas y nuestros servicios
          </p>
          <!-- / Contact -->
        </q-card-section>
      </q-card>
    </section>
    <!-- / Default View  -->
  </q-page>
</template>

<script lang="ts" setup>
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
import OrderWidget from 'src/components/widgets/shop/OrderWidget.vue';
import { injectStrict, _vendorInjectable } from 'src/injectables';
import { computed, onBeforeMount } from 'vue';
import { notificationHelper, goTo } from 'src/helpers';
import { ROUTE_NAME } from 'src/router';
import { openURL, useQuasar } from 'quasar';

const $q = useQuasar();
const $vendor = injectStrict(_vendorInjectable);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const orders = computed(() => $vendor.ordersOnProccess);
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function onAdminAnnClick() {
  $q.dialog({
    title: 'Administrar Anuncios',
    class: 'text-justify',
    message:
      'Aún no tenemos disponible la administración de los anuncios. En próximas versiones podrá usar este servicio',
  });
}
/**
 * Open Help
 */
function openHelp() {
  openURL('https://help.wings.servimav.com');
}
/**
 * On Before Mount
 */
onBeforeMount(async () => {
  try {
    await $vendor.listOrders();
  } catch (error) {
    notificationHelper.axiosError(error);
  }
});
</script>
