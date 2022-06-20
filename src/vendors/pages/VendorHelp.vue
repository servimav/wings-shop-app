<template>
  <q-page padding class="q-gutter-y-sm">
    <title-widget :data="{ title: 'Ayuda' }" />

    <q-card>
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>
      <q-card-section>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
</script>
