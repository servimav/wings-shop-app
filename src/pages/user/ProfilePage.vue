<template>
  <q-page padding class="q-gutter-y-sm">
    <section v-if="profile">
      <q-card>
        <q-img
          :src="avatar"
          :ratio="4 / 3"
          spinner-color="primary"
          spinner-size="82px"
        />
        <q-card-section>
          <div class="text-h6">
            {{ `${profile?.first_name} ${profile?.last_name}` }}
          </div>
          <div
            class="text-subtitle2"
            v-if="profile?.role && profile?.role.display_name"
          >
            {{ profile.role.display_name }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-list bordered>
            <!-- email -->
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-email-outline" />
              </q-item-section>
              <q-item-section>{{ profile?.email }}</q-item-section>
            </q-item>
            <!-- / email -->
            <!-- phone -->
            <q-item v-if="profile?.phone">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-phone" />
              </q-item-section>
              <q-item-section>{{ profile?.phone }}</q-item-section>
            </q-item>
            <!-- / phone -->
            <!-- address -->
            <q-item v-if="profile?.address">
              <q-item-section avatar>
                <q-icon color="primary" name="mdi-map-marker" />
              </q-item-section>
              <q-item-section>{{ profile?.address }}</q-item-section>
            </q-item>
            <!-- / phone -->
          </q-list>
        </q-card-section>
        <q-card-actions>
          <q-btn
            class="full-width"
            color="primary"
            label="Editar"
            @click="editDialog = true"
          />
        </q-card-actions>
      </q-card>
    </section>

    <section>
      <q-card>
        <q-card-section>
          <div class="text-h6 text-center">Selecciona tu Localidad</div>
        </q-card-section>
        <q-card-section>
          <map-locality-selector class="q-mt-sm" />
        </q-card-section>
      </q-card>
    </section>

    <!-- Edit Dialog -->
    <q-dialog v-model="editDialog" maximized v-if="profile">
      <profile-form :profile="profile" @completed="editDialog = false" />
    </q-dialog>
    <!-- / Edit Dialog -->
  </q-page>
</template>

<script setup lang="ts">
import { notificationHelper } from 'src/helpers';
import { injectStrict, _user } from 'src/injectables';
import { computed, onBeforeMount, ref } from 'vue';
import ProfileForm from 'components/forms/ProfileForm.vue';
import MapLocalitySelector from 'src/components/forms/MapLocalitySelector.vue';
/**
 * -----------------------------------------
 *	Inject
 * -----------------------------------------
 */
const $user = injectStrict(_user);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const avatar = computed(() =>
  profile.value?.avatar ? profile.value.avatar : 'images/default.jpg'
);
const editDialog = ref(false);
const profile = computed(() => $user.profile);
/**
 * -----------------------------------------
 *	Init
 * -----------------------------------------
 */

onBeforeMount(async () => {
  try {
    await $user.getProfile();
  } catch (error) {
    notificationHelper.axiosError(error);
  }
});
</script>
