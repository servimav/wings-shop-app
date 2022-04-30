import { api, apiAuthenticated } from './tests/api';
import { ShopOfferTests } from './tests/shopOffer';
import { ShopOrderTests } from './tests/shopOrder';
import { ShopStoreTests } from './tests/shopStore';
import { UserTest } from './tests/user';

/**
 * 
 */
const { authLogin, authRegister } = UserTest(api);
const $store = ShopStoreTests(apiAuthenticated);
const $offer = ShopOfferTests(apiAuthenticated);
const $order = ShopOrderTests(apiAuthenticated);
/**
 * test
 */
async function runTests() {
  // User tests
  await authLogin();
  await authRegister();
  // ShopStore
  await $store.create();
  await $store.update();
  // ShopOffer
  await $offer.create();
  await $offer.update();
  // Shoporder
  await $order.create();
  await $order.updateStatus();
}


runTests();
