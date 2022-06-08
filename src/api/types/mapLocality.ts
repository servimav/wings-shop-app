import { IMapCoordinate } from './mapPosition';

/**
 * Map Locality
 */
export interface IMapLocality {
  id: number;
  name: string;
  description?: string;
  parent?: IMapLocality;
  children?: IMapLocality[];
  position?: IMapCoordinate;
}
