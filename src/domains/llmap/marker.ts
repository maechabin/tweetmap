import * as L from 'leaflet';

export interface MarkerModel {
  id: number;
  lat: number;
  lng: number;
  name: string;
  img: string;
  link: string;
  text: string;
  createdAt: string;
  place: string;
}

export class Marker extends L.Marker {
  private readonly id: number;
  private readonly name: string;
  private readonly img: string;
  private readonly link: string;
  private readonly text: string;
  private readonly createdAt: string;
  private readonly place: string;

  get Id(): number {
    return this.id;
  }

  private static createIcon(): L.DivIcon {
    const markerHtmlStyles1 = `
      position: absolute;
      left: -12px;
      top: -12px;
      border-radius: 50%;
      border: 8px solid #1ca1f2;
      width: 8px;
      height: 8px;
    `;
    const markerHtmlStyles2 = `
      position: absolute;
      bottom: -30px;
      left: -6px;
      border: 10px solid transparent;
      border-top: 17px solid #1ca1f2;
    `;
    return L.divIcon({
      className: 'marker-icon',
      iconAnchor: [0, 24],
      popupAnchor: [0, -24],
      html: `
        <span style="${markerHtmlStyles1}" />
        <span style="${markerHtmlStyles2}" />
      `,
    });
  }

  constructor(marker: MarkerModel) {
    super([marker.lat, marker.lng], {
      icon: Marker.createIcon(),
      draggable: false,
    });

    this.id = marker.id;
    this.name = marker.name;
    this.img = marker.img;
    this.link = marker.link;
    this.text = marker.text;
    this.createdAt = marker.createdAt;
    this.place = marker.place;
  }

  displayComment(): Marker {
    this.bindPopup(this.createComment(), {
      closeButton: true,
      autoClose: false,
      closeOnClick: false,
    }).openPopup();
    return this;
  }

  private createComment(): string | HTMLElement {
    return `
      <p style="font-size: 14px;">
        <a href="${this.link}" target="_blank" rel="noopener">
          <img src="${this.img}" width="24" style="vertical-align: middle;" />
        </a>
        <a href="${this.link}" target="_blank" rel="noopener">
          <b>${this.name}</b>
        </a>
      </p>
      <p>${this.text}</p>
      <p><date>${this.createdAt}</date> ${this.place}</p>
    `;
  }
}
