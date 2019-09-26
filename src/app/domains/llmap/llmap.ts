import * as L from 'leaflet';

export class LLMap {
  llmap!: L.Map;

  initMap(elem: any) {
    const token =
      'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
    /** Layer */
    const streetsLayer = L.tileLayer(
      `
    https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${token}
    `,
      {
        attribution: `
          Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
          <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
          Imagery © <a href="https://www.mapbox.com/">Mapbox</a>
        `,
        maxZoom: 18,
        id: 'mapbox.streets', // mapbox.streets | mapbox.satellite
        accessToken: 'your.mapbox.access.token',
      },
    );

    const satelliteLayer = L.tileLayer(
      `
    https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${token}
    `,
      {
        attribution: `
          Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,
          <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,
          Imagery © <a href="https://www.mapbox.com/">Mapbox</a>
        `,
        maxZoom: 18,
        id: 'mapbox.satellite', // mapbox.streets | mapbox.satellite
        accessToken: 'your.mapbox.access.token',
      },
    );

    this.llmap = L.map(elem)
      .setView([35.69432984468491, 139.74267643565133], 5)
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

  putMarker(marker: {
    lat: number;
    lng: number;
    name: string;
    img: string;
    link: string;
    text: string;
    createdAt: string;
    place: string;
  }) {
    /** Icon */
    const markerHtmlStyles1 = `
        position: absolute;
        left: -12px;
        top: -12px;
        border-radius: 50%;
        border: 8px solid deeppink;
        width: 8px;
        height: 8px;
      `;
    const markerHtmlStyles2 = `
        position: absolute;
        bottom: -30px;
        left: -6px;
        border: 10px solid transparent;
        border-top: 17px solid deeppink;
      `;
    const icon = L.divIcon({
      className: 'marker-icon',
      iconAnchor: [0, 24],
      html: `
          <span style="${markerHtmlStyles1}" />
          <span style="${markerHtmlStyles2}" />
        `,
    });

    const comment = `
    <p style="font-size: 14px;">
      <a href="${marker.link}" target="_blank"><img src="${marker.img}" width="24" style="vertical-align: middle;" /></a>
      <a href="${marker.link}" target="_blank">
        <b>${marker.name}</b>
      </a>
    </p>
    <p>${marker.text}</p>
    <p><date>${marker.createdAt}</date> ${marker.place}</p>
    `;

    L.marker([marker.lat, marker.lng], {
      icon,
      draggable: false,
    })
      .addTo(this.llmap)
      .bindPopup(comment, {
        closeButton: true,
        autoClose: false,
        closeOnClick: false,
      })
      .openPopup();
  }
}
