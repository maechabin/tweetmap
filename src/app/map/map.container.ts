import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

import { TwitterService } from '../core/twitter.service';
import { SpinnerService } from '../core/spinner.service';
import { LLMap } from '../domains/llmap/llmap';

@Component({
  selector: 'app-map',
  templateUrl: './map.container.html',
  styleUrls: ['./map.container.scss'],
})
export class MapContainerComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) private readonly sidenav: MatSidenav;

  tweets: any[];
  keyword: string;
  readonly mobileQuery: MediaQueryList = this.media.matchMedia('(max-width: 720px)');
  private el: HTMLElement;
  private readonly map = new LLMap();

  constructor(
    private twitterService: TwitterService,
    private spinnerService: SpinnerService,
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private media: MediaMatcher,
    private location: Location,
  ) {}

  ngOnInit() {
    this.el = this.elementRef.nativeElement;
    const mapElem = this.el.querySelector('.map') as HTMLElement;
    setTimeout(() => {
      this.map.initMap(mapElem);
    }, 0);

    this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        this.keyword = val.url.split('=')[1] ? decodeURI(val.url.split('=')[1]) : '';
        if (this.keyword) {
          this.getTweets(this.keyword);
        }
      }
    });
  }

  /** ヘッダーのハンバーガーメニューをクリックした時の処理 */
  handleMenuClick() {
    this.sidenav.toggle();
  }

  handleTweetClick(latlng: { lat: number; lng: number }) {
    this.map.panTo(latlng);
  }

  handleSearchButtonClick(event: string) {
    this.location.replaceState(`?q=${event}`);
    this.getTweets(event);
  }

  async getTweets(q?: string) {
    this.spinnerService.startSpinner();
    const tweets = await this.twitterService.search(q);

    this.tweets = tweets.result.statuses.map((tweet: any) => {
      const createdAt = `
      ${new Date(tweet.created_at).getFullYear()}-${new Date(tweet.created_at).getMonth() +
        1}-${new Date(tweet.created_at).getDate()}
      ${new Date(tweet.created_at).getHours()}:${new Date(tweet.created_at).getMinutes()}`;

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
        id: tweet.id,
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

    this.map.clearMarker();
    this.tweets
      .filter((tweet: any) => tweet.place)
      .forEach((tweet: any) => {
        this.map.putMarker(tweet);
      });
    this.spinnerService.stopSpinner();
  }
}
