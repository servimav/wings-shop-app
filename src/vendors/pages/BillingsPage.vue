<template>
  <q-page padding>
    <q-card class="no-box-shadow">
      <q-card-section class="text-center">
        <div class="text-h6">Facturas</div>
      </q-card-section>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div
            class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
            v-for="(billing, key) in billings"
            :key="`billing-${billing.id}-${key}`"
          >
            <billing-widget :data="billing" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { IBilling } from 'src/api';
import { $servimavApi } from 'src/boot/axios';
import BillingWidget from 'src/vendors/components/widgets/BillingWidget.vue';
import { onBeforeMount, ref } from 'vue';

const billings = ref<IBilling[]>([]);

onBeforeMount(async () => {
  try {
    const resp = await $servimavApi.Billings.index();
    billings.value = resp.data;
  } catch (error) {
    console.log(error);
  }
});
</script>
