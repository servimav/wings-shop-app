<template>
  <q-page padding>
    <q-card>
      <q-img
        src="images/servimav_logo_only.png"
        :ratio="4 / 3"
        spinner-color="primary"
        spinner-size="82px"
      />
      <q-card-section>
        <div class="text-h6 text-center">SERVIMAV S.R.L.</div>
      </q-card-section>
      <q-card-section>
        <q-list bordered class="rounded-borders">
          <!-- Expansion -->
          <q-expansion-item
            expand-separator
            label="Quiénes Somos"
            icon="mdi-fingerprint"
          >
            <q-card-section>
              <p>
                SERVIMAV S.R.L es una Mediana Empresa Privada fundada en Octubre
                de 2021
              </p>
            </q-card-section>
          </q-expansion-item>
          <!-- / Expansion -->
          <!-- Expansion -->
          <q-expansion-item
            expand-separator
            label="Dónde encontrarnos"
            icon="mdi-map-marker"
          >
            <q-card-section>
              Puede visitarnos en Calle Silencio #32 e/ Cerize y Villuendas,
              Palmira, Cienfuegos
            </q-card-section>
          </q-expansion-item>
          <!-- / Expansion -->
          <!-- Expansion -->
          <q-expansion-item
            expand-separator
            label="Cómo contactarnos"
            icon="mdi-phone"
          >
            <q-card-section>
              <q-chip class="glossy" icon="mdi-phone" label="+53 59887003" />
              <q-chip
                class="glossy"
                icon="mdi-email-outline"
                label="servimav@yahoo.com"
              />
              <q-chip class="glossy" icon="mdi-whatsapp" label="+53 59887003" />
              <q-chip class="glossy" icon="mdi-send" label="+53 59887003" />
            </q-card-section>
          </q-expansion-item>
          <!-- / Expansion -->
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>
