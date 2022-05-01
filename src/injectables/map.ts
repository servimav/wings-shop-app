import { latLng, LatLng } from 'leaflet';
import { Dialog, Platform } from 'quasar';
import { $capacitor } from 'src/helpers';
import { InjectionKey, ref } from 'vue';

interface IMaPSettings {
  multiple: boolean;
  zoom: {
    min: number;
    max: number;
  };
}

class MapInjectable {
  private _center = ref<LatLng>(latLng(22.245531, -80.393699));
  private _gpsPosition = ref<LatLng | undefined>(undefined);
  private _markers = ref<LatLng[]>([]);
  private _settings = ref<IMaPSettings>({
    multiple: false,
    zoom: {
      max: 18,
      min: 14,
    },
  });
  private _zoom = ref(16);
  /**
   * -----------------------------------------
   *	getters & setters
   * -----------------------------------------
   */
  get center() {
    return this._center.value;
  }
  set center(center: LatLng) {
    this._center.value = center;
  }
  get gpsPosition() {
    return this._gpsPosition.value;
  }
  set gpsPosition(center: LatLng | undefined) {
    this._gpsPosition.value = center;
  }
  get markers() {
    return this._markers.value;
  }
  set markers(markers: LatLng[]) {
    this._markers.value = markers;
  }
  get settings() {
    return this._settings.value;
  }
  set settings(s: IMaPSettings) {
    this._settings.value = s;
  }
  get zoom() {
    return this._zoom.value;
  }
  set zoom(zoom: number) {
    this._zoom.value = zoom;
  }
  /**
   * -----------------------------------------
   *	Mutations
   * -----------------------------------------
   */
  async getGpsPosition() {
    if (!Platform.is.capacitor) return;
    try {
      const coords = await $capacitor.Geolocation_currentPosition();
      this.gpsPosition = coords;
    } catch (error) {
      Dialog.create({
        title: 'Activación de GPS',
        message: 'Necesitamos que active su conexión de GPS',
        ok: true,
        persistent: true,
      }).onOk(async () => {
        await this.getGpsPosition();
      });
    }
  }
  /**
   * markGpsPosition
   */
  async markGpsPosition() {
    this.markGpsPosition();
    if (this.gpsPosition) {
      this.markers = [];
      this.markers.push(this.gpsPosition);
      this.center = this.gpsPosition;
      this.zoom = 16;
    } else {
      await this.getGpsPosition();
    }
  }
}

export const $mapInjectable = new MapInjectable();
export const _map: InjectionKey<MapInjectable> = Symbol('MapInjectable');
