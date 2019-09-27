import { Component, OnInit, ElementRef } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  Params,
  RoutesRecognized,
} from '@angular/router';

import { TwitterService } from '../core/twitter.service';
import { LLMap } from '../domains/llmap/llmap';

@Component({
  selector: 'app-map',
  template: `
    <div class="app">
      <app-tweets
        [tweets]="tweets"
        (tweetClick)="handleTweetClick($event)"
        class="tweet"
      ></app-tweets>
      <div class="map"></div>
    </div>
  `,
  styles: [
    `
      .app {
        display: flex;
      }
      .map {
        width: calc(100% - 320px);
        height: 100vh;
      }
      .tweet {
        width: 320px;
        height: 100vh;
        overflow: scroll;
      }
    `,
  ],
})
export class MapContainerComponent implements OnInit {
  private el: HTMLElement;
  readonly map = new LLMap();
  tweets: any[];

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

  handleTweetClick(latlng: { lat: number; lng: number }) {
    this.map.panTo(latlng);
  }

  async getTweets(q?: string) {
    const tweets = await this.twitterService.search(q);

    this.tweets = tweets.result.statuses.map((tweet: any) => {
      const createdAt = `
      ${new Date(tweet.created_at).getFullYear()}-${new Date(
        tweet.created_at,
      ).getMonth() + 1}-${new Date(tweet.created_at).getDate()}
      ${new Date(tweet.created_at).getHours()}:${new Date(
        tweet.created_at,
      ).getMinutes()}`;

      const lng =
        tweet.place && tweet.place.bounding_box
          ? tweet.place.bounding_box.coordinates[0][0][0] -
            (tweet.place.bounding_box.coordinates[0][0][0] -
              tweet.place.bounding_box.coordinates[0][1][0]) /
              2
          : null;
      const lat =
        tweet.place && tweet.place.bounding_box
          ? tweet.place.bounding_box.coordinates[0][0][1] -
            (tweet.place.bounding_box.coordinates[0][0][1] -
              tweet.place.bounding_box.coordinates[0][2][1]) /
              2
          : null;

      const link = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

      const place = tweet.place && tweet.place.name ? tweet.place.name : null;

      return {
        lng,
        lat,
        name: tweet.user.screen_name,
        img: tweet.user.profile_image_url_https,
        link,
        text: tweet.text,
        createdAt,
        place,
      };
    });

    this.tweets
      .filter((tweet: any) => tweet.place)
      .forEach((tweet: any) => {
        this.map.putMarker(tweet);
      });
  }
}
