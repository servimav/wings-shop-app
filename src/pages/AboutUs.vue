<template>
  <q-page padding>
    <q-card>
      <q-img
        src="images/logo_white.png"
        :ratio="1"
        spinner-color="primary"
        spinner-size="82px"
      />
      <q-card-section>
        <q-list bordered class="rounded-borders">
          <!-- Quiénes Somos -->
          <q-expansion-item
            expand-separator
            label="Quiénes Somos"
            icon="mdi-cube-outline"
          >
            <q-card-section class="text-justify">
              <p>
                Somos un grupo emprendedor que desea poner a tu alcance ofertas
                de varios proveedores con envío a domicilio para hacer tus días
                más cómodos.
              </p>
            </q-card-section>
          </q-expansion-item>
          <!-- / Quiénes Somos -->
          <!-- Cómo contactarnos -->
          <q-expansion-item
            expand-separator
            label="Cómo contactarnos"
            icon="mdi-email-outline"
          >
            <contact-form />
          </q-expansion-item>
          <!-- / Cómo contactarnos -->
          <!-- App -->
          <q-expansion-item
            expand-separator
            label="Sobre la Aplicación"
            icon="mdi-cellphone"
          >
            <q-card-section class="text-center">
              <p class="text-body1">{{ appInfo.title }}</p>
              <p>Versión {{ appInfo.version }}-{{ appInfo.version_code }}</p>
              <p>{{ appInfo.description }}</p>
              <p>{{ appInfo.comments }}</p>
            </q-card-section>
          </q-expansion-item>
          <!-- / App -->
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import ContactForm from 'src/components/forms/ContactForm.vue';
import { injectStrict, _app } from 'src/injectables';
import { computed } from 'vue';
/**
 * -----------------------------------------
 *	Injectable
 * -----------------------------------------
 */
const $app = injectStrict(_app);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const appInfo = computed(() => $app.appInfo);
</script>
