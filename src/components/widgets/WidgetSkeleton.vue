<template>
  <div class="row q-col-gutter-sm" v-if="!$props.order && $props.count">
    <div
      class="col-xs-6 col-sm-4 col-md-3 col-lg-2"
      v-for="i in $props.count"
      :key="`skeleton-${i}`"
    >
      <q-card flat>
        <q-skeleton height="150px" square />

        <q-card-section class="q-pa-xs">
          <q-skeleton type="text" class="text-subtitle1" />
          <q-skeleton type="text" width="50%" class="text-subtitle1" />
          <q-skeleton type="text" class="text-caption" />
        </q-card-section>
      </q-card>
    </div>
  </div>

  <q-card v-else>
    <q-item>
      <q-item-section avatar>
        <q-skeleton type="QAvatar" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" />
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-skeleton height="5rem" square />

    <q-card-actions align="right" class="q-gutter-md">
      <q-skeleton type="QBtn" />
      <q-skeleton type="QBtn" />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
const $props = defineProps<{ count?: number; order?: boolean }>();
</script>
