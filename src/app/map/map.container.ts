import { Component, OnInit, ElementRef } from '@angular/core';

import { TwitterService } from '../core/twitter.service';
import { LLMap } from '../domains/llmap/llmap';

@Component({
  selector: 'app-map',
  template: `
    <div class="map"></div>
  `,
  styles: [
    `
      .map {
        width: 100%;
        height: 100vh;
      }
    `,
  ],
})
export class MapContainerComponent implements OnInit {
  private el: HTMLElement;
  readonly map = new LLMap();

  constructor(
    private twitterService: TwitterService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    this.el = this.elementRef.nativeElement;
    const mapElem = this.el.querySelector('.map') as HTMLElement;
    this.map.initMap(mapElem);

    this.twitterService.search().then(data => {
      const a = data.result.statuses
        .filter(d => d.place)
        .map(b => {
          this.map.putMarker({
            lng: b.place.bounding_box.coordinates[0][0][0],
            lat: b.place.bounding_box.coordinates[0][0][1],
            name: b.user.screen_name,
            text: b.text,
          });
          return {
            name: b.user.screen_name,
            text: b.text,
            bounding_box: b.place.bounding_box.coordinates,
          };
        });
      console.log(a);
    });
  }
}
