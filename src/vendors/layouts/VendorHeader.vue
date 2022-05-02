<template>
  <q-header elevated>
    <q-toolbar class="bg-primary">
      <q-btn
        flat
        dense
        round
        icon="mdi-menu"
        aria-label="Menu"
        @click="toggleDrawerLeft"
      />

      <q-toolbar-title>
        <q-form @submit.prevent="onSubmit">
          <q-input
            v-model="search"
            type="search"
            placeholder="Buscar"
            bg-color="white"
            outlined
            dense
          >
            <template v-slot:after>
              <q-btn
                class="text-white"
                icon="mdi-magnify"
                flat
                dense
                round
                aria-label="Search"
                type="submit"
                @click="onSubmit"
              />
            </template>
          </q-input>
        </q-form>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { injectStrict, _app } from 'src/injectables';
import { ROUTE_NAME } from 'src/router';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
/**
 * -----------------------------------------
 *	Injectables
 * -----------------------------------------
 */

const $app = injectStrict(_app);
const $router = useRouter();
/**
 * -----------------------------------------
 *	data
 * -----------------------------------------
 */
const search = ref('');
/**
 * -----------------------------------------
 *	Methods
 * -----------------------------------------
 */
function onSubmit() {
  void $router.push({
    name: ROUTE_NAME.SHOP_SEARCH,
    query: { search: search.value },
  });
  search.value = '';
}

function toggleDrawerLeft() {
  $app.drawerLeft = !$app.drawerLeft;
}
</script>
