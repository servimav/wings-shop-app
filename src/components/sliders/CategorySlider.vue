<template>
  <q-card class="no-box-shadow">
    <q-card-section>
      <Carousel
        :items-to-show="3"
        :wrap-around="true"
        v-if="categories.length > 3"
      >
        <Slide v-for="(cat, key) in categories" :key="`cat-${cat.tag}-${key}`">
          <q-avatar
            size="5rem"
            font-size="3rem"
            color="primary"
            text-color="white"
            :icon="cat.icons.mdi"
            @click="goToCategory(cat.tag)"
          />
        </Slide>

        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Navigation, Slide } from 'vue3-carousel';
import { injectStrict, _shopCategory } from 'src/injectables';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { ROUTE_NAME } from 'src/router';
/**
 * -----------------------------------------
 * setup
 * -----------------------------------------
 */
const $categories = injectStrict(_shopCategory);
const $router = useRouter();
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const categories = computed(() => $categories.available);

/**
 * goToctegory
 * @param cat
 */
function goToCategory(cat: string) {
  void $router.push({ name: ROUTE_NAME.SHOP_CATEGORY, query: { tag: cat } });
}
</script>
