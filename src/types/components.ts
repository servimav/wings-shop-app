/**
 * Ivue carousel settings
 */
export interface IVueCarouselSettings {
  itemsToShow?: number;
  itemsToScroll?: number;
  wrapAround?: boolean;
  snapAlign?: 'start' | 'center' | 'end';
  transition?: number;
  mouseDrag?: boolean;
  touchDrag?: boolean;
}
