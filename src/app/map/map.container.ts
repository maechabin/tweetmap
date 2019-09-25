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

    this.twitterService.search().then((Tweets: any) => {
      Tweets.result.statuses
        .filter((tweet: any) => tweet.place)
        .forEach((tweet: any) => {
          this.map.putMarker({
            lng: tweet.place.bounding_box.coordinates[0][0][0],
            lat: tweet.place.bounding_box.coordinates[0][0][1],
            name: tweet.user.screen_name,
            text: tweet.text,
          });
        });
    });
  }
}
