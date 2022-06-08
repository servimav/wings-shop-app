<template>
  <q-page padding class="q-gutter-y-sm">
    <section class="q-gutter-y-sm">
      <div class="row q-col-gutter-sm">
        <div class="col-sm-6 col-md-4 col-xs-12" v-if="!isAuth()">
          <auth-widget />
        </div>
        <!-- Announcements -->
        <div class="col-sm-6 col-md-4 col-xs-12" v-if="announcements.length">
          <announcemenst-slider :data="announcements" />
        </div>
        <!-- / Announcements -->

        <!-- categories -->
        <div
          class="col-sm-6 col-md-4 col-xs-12 q-gutter-y-sm"
          v-if="hasCategories"
        >
          {{ hasCategories }}
          <category-slider />
        </div>
        <!-- / categories -->
        <!-- Top Stores -->
        <div class="col-sm-6 col-md-4 col-xs-12" v-if="stores.length">
          <title-widget :data="{ title: 'Tiendas Destacadas' }" />
          <store-group :data="stores.slice(0, 4)" class="q-pt-sm" />
          <div v-if="stores.slice(4, stores.length).length > 2">
            <stores-slider :data="stores.slice(4, stores.length)" />
          </div>
        </div>
        <!-- / Top Stores -->
        <!-- Top Offers -->
        <div class="col-sm-6 col-md-4 col-xs-12" v-if="offers.length">
          <title-widget :data="{ title: 'Ofertas Destacadas' }" />
          <offer-group horizontal :data="offers.slice(0, 4)" class="q-pt-sm" />
          <div v-if="offers.slice(4, offers.length).length > 2">
            <offers-slider :data="offers.slice(4, offers.length)" />
          </div>
        </div>
        <!-- / Top Offers -->
      </div>
    </section>

    <section v-if="!offers.length && !stores.length">
      <widget-skeleton :count="6" />
    </section>
  </q-page>
</template>

<script lang="ts" setup>
import AuthWidget from 'src/components/widgets/AuthWidget.vue';
import CategorySlider from 'src/components/sliders/CategorySlider.vue';
// import HomeSlider from 'src/components/sliders/HomeSlider.vue';
import AnnouncemenstSlider from 'src/components/sliders/AnnouncemenstSlider.vue';
import StoreGroup from 'src/components/groups/StoresGroup.vue';
import OfferGroup from 'src/components/groups/OffersGroup.vue';
import TitleWidget from 'src/components/widgets/TitleWidget.vue';
import OffersSlider from 'src/components/sliders/OffersSlider.vue';
import StoresSlider from 'src/components/sliders/StoresSlider.vue';
import WidgetSkeleton from 'components/widgets/WidgetSkeleton.vue';
import { isAuth, notificationHelper } from 'src/helpers';
import { computed, onBeforeMount } from 'vue';
import { injectStrict, _app, _shopCategory } from 'src/injectables';

const $app = injectStrict(_app);
const $categories = injectStrict(_shopCategory);
/**
 * -----------------------------------------
 *	Data
 * -----------------------------------------
 */
const hasCategories = computed(() => $categories.available.length > 3);
const announcements = computed(() => $app.homeAnn);
const offers = computed(() => $app.homeOffers);
const stores = computed(() => $app.homeStores);

onBeforeMount(() => {
  Promise.all([
    $app.loadOffers(),
    $app.loadStores(),
    $app.loadAnnouncements(),
  ]).catch((e) => {
    notificationHelper.axiosError(e, 'Ha ocurrido un error');
  });
});
</script>
