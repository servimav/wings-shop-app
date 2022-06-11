/**
 * Shop Basic Stats
 */
export interface IShopStatsBasic {
  count: {
    stores: number;
    offers: number;
    orders: number;
  };
  earn: {
    offers: number;
    shipping: number;
  };
  pay: {
    service: number;
  };
}
