import * as L from 'leaflet';

import { Marker, MarkerModel } from './marker';
import { LLMap } from './llmap';

export class LLMapService {
  llmap!: LLMap;
  private readonly tweetMarker: Map<number, L.Marker> = new Map();

  initMap(elem: HTMLElement): void {
    this.llmap = new LLMap(elem);
  }

  putMarker(markerInfo: MarkerModel): void {
    const marker = new Marker(markerInfo);
    marker.addTo(this.llmap).displayComment();
    this.tweetMarker.set(marker.Id, marker);
  }

  clearMarker(): void {
    this.tweetMarker.forEach(marker => {
      this.llmap.removeLayer(marker);
    });
    this.tweetMarker.clear();
  }

  panTo(latlng: { lat: number; lng: number }): void {
    this.llmap.panTo(new L.LatLng(latlng.lat, latlng.lng));
  }
}
