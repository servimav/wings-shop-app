<template>
  <q-page padding>
    <q-card flat>
      <q-skeleton height="15rem" square />

      <q-card-section>
        <q-skeleton type="text" class="text-subtitle1" />
        <q-skeleton type="text" class="text-caption" />
        <q-skeleton type="text" width="50%" class="text-subtitle1" />
        <q-skeleton type="text" width="50%" class="text-subtitle1" />
      </q-card-section>
    </q-card>
    <div class="q-mt-sm" v-if="$props.extended">
      <widget-skeleton :count="2" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import WidgetSkeleton from './WidgetSkeleton.vue';

const $props = defineProps<{ extended?: boolean }>();
</script>
