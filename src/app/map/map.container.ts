import { Component, OnInit, ElementRef } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params,
  RoutesRecognized,
} from '@angular/router';
import { skip } from 'rxjs/operators';

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
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.el = this.elementRef.nativeElement;
    const mapElem = this.el.querySelector('.map') as HTMLElement;
    this.map.initMap(mapElem);

    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        const q = val.url.split('=')[1];
        this.getTweets(q);
      }
    });
  }

  async getTweets(q?: string) {
    const tweets = await this.twitterService.search(q);
    tweets.result.statuses
      .filter((tweet: any) => tweet.place)
      .forEach((tweet: any) => {
        console.log(tweet);
        const createdAt = `
          ${new Date(tweet.created_at).getFullYear()}-${new Date(
          tweet.created_at,
        ).getMonth() + 1}-${new Date(tweet.created_at).getDate()}
          ${new Date(tweet.created_at).getHours()}:${new Date(
          tweet.created_at,
        ).getMinutes()}`;

        const lng =
          tweet.place.bounding_box.coordinates[0][0][0] -
          (tweet.place.bounding_box.coordinates[0][0][0] -
            tweet.place.bounding_box.coordinates[0][1][0]) /
            2;
        const lat =
          tweet.place.bounding_box.coordinates[0][0][1] -
          (tweet.place.bounding_box.coordinates[0][0][1] -
            tweet.place.bounding_box.coordinates[0][2][1]) /
            2;

        const link = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

        this.map.putMarker({
          lng,
          lat,
          name: tweet.user.screen_name,
          img: tweet.user.profile_image_url_https,
          link,
          text: tweet.text,
          createdAt,
          place: tweet.place.name,
        });
      });
  }
}
