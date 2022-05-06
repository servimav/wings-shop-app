import { AxiosInstance } from 'axios';
import { IMapLocality } from '../types/mapLocality';
import { IMapCoordinate } from '../types/mapPosition';

/**
 * MapLocalityService
 */
export class MapLocalityService {
  constructor(private readonly api: AxiosInstance) {}
  /**
   * list
   * @returns
   */
  async list() {
    return this.api.get<IMapLocality[]>('api/map/localities');
  }
  /**
   * Where Am I
   * @param pos
   * @returns
   */
  async whereami(pos: IMapCoordinate) {
    return this.api.get<IMapLocality>('api/map/localities', { params: pos });
  }
}
