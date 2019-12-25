import * as L from 'leaflet';

import * as Constants from './constants';
import { Marker, MarkerModel } from './marker';

export class LLMap {
  llmap!: L.Map;
  private readonly tweetMarker: Map<number, L.Marker> = new Map();

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

    this.tweetMarker.set(
      marker.Id,
      L.marker(marker.LatLng, {
        icon: marker.createIcon(),
        draggable: false,
      })
        .addTo(this.llmap)
        .bindPopup(marker.createComment(), {
          closeButton: true,
          autoClose: false,
          closeOnClick: false,
        })
        .openPopup(),
    );
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
