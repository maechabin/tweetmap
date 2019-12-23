import * as L from 'leaflet';

import * as Constants from './constants';
import { Marker, MarkerModel } from './marker';

export class LLMap {
  llmap!: L.Map;
  tweetMarker: {
    [id: number]: L.Marker;
  } = {};

  initMap(elem: HTMLElement): void {
    /** Layers */
    const streetsLayer = this.createTileLayer(Constants.LayerId.MapboxStreets);
    const satelliteLayer = this.createTileLayer(Constants.LayerId.MapboxSatellite);

    this.llmap = L.map(elem)
      .setView(Constants.DefaultCenteringPosition as L.LatLngExpression, Constants.DefaultZoomSize)
      .addLayer(streetsLayer);

    L.control
      .layers(
        {
          street: streetsLayer,
          satellite: satelliteLayer,
        },
        {},
        { position: 'bottomright' },
      )
      .addTo(this.llmap);
  }

  private createTileLayer(layerId: Constants.LayerId): L.Layer {
    let layerUrl: string;
    switch (layerId) {
      case Constants.LayerId.MapboxStreets:
        layerUrl = Constants.StreetLayer;
        break;
      case Constants.LayerId.MapboxSatellite:
        layerUrl = Constants.SatelliteLayer;
        break;
    }
    return L.tileLayer(layerUrl, {
      attribution: Constants.Attribution,
      maxZoom: Constants.LayerMaxZoomSize,
      id: layerId,
      accessToken: Constants.Token,
    });
  }

  putMarker(markerInfo: MarkerModel): void {
    const marker = new Marker(markerInfo);

    this.tweetMarker[marker.Id] = L.marker(marker.LatLng, {
      icon: marker.createIcon(),
      draggable: false,
    })
      .addTo(this.llmap)
      .bindPopup(marker.createComment(), {
        closeButton: true,
        autoClose: false,
        closeOnClick: false,
      })
      .openPopup();
  }

  clearMarker(): void {
    Object.values(this.tweetMarker).forEach(marker => {
      this.llmap.removeLayer(marker);
    });
    Object.keys(this.tweetMarker).forEach(key => {
      delete this.tweetMarker[key];
    });
  }

  panTo(latlng: { lat: number; lng: number }): void {
    this.llmap.panTo(new L.LatLng(latlng.lat, latlng.lng));
  }
}
