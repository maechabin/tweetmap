import * as L from 'leaflet';

import * as Constants from './constants';

export class LLMap extends L.Map {
  /** Layers */
  private readonly streetsLayer = this.createTileLayer(Constants.LayerId.MapboxStreets);
  private readonly satelliteLayer = this.createTileLayer(Constants.LayerId.MapboxSatellite);

  constructor(elem: HTMLElement) {
    super(elem);

    this.setView(
      Constants.DefaultCenteringPosition as L.LatLngExpression,
      Constants.DefaultZoomSize,
    ).addLayer(this.streetsLayer);

    this.addLayerToControl();
  }

  private addLayerToControl(): void {
    L.control
      .layers(
        {
          street: this.streetsLayer,
          satellite: this.satelliteLayer,
        },
        {},
        { position: 'bottomright' },
      )
      .addTo(this);
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
}
