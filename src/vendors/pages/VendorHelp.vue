<template>
  <q-page padding class="q-gutter-y-sm">
    <q-card>
      <q-card-section class="text-center">
        <div class="text-h6">Envíenos su pregunta</div>
        <div class="text-subtitle2">
          Nuestro deber es ayudarlo a mejorar sus ventas con nuestros servicios
        </div>
      </q-card-section>
      <q-card-section>
        <contact-form />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import ContactForm from 'src/components/forms/ContactForm.vue';
</script>
