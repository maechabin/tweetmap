import { Injectable } from '@angular/core';

import { TwitterService } from '../../core/twitter.service';
import { SpinnerService } from '../../core/spinner.service';
import { LLMap } from '../../domains/llmap/llmap';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  socket: WebSocket;
  private Tweets: any[] = [];
  private readonly map = new LLMap();

  get tweets() {
    return this.Tweets;
  }

  set tweets(tweets: any) {
    this.Tweets = tweets;
  }

  constructor(private twitterService: TwitterService, private spinnerService: SpinnerService) {}

  initMap(mapElem: HTMLElement): void {
    setTimeout(() => {
      this.map.initMap(mapElem);
    }, 0);
  }

  panTo(latlng: { lat: number; lng: number }): void {
    this.map.panTo(latlng);
  }

  async getTweets(q?: string): Promise<void> {
    this.spinnerService.startSpinner();
    const tweets = await this.twitterService.search(q);
    this.tweets = this.serializeTweets(tweets.result.statuses);
    this.map.clearMarker();
    this.tweets
      .filter((tweet: any) => tweet.place)
      .forEach((tweet: any) => {
        this.map.putMarker(tweet);
      });
    this.spinnerService.stopSpinner();
  }

  getStream() {
    this.socket = new WebSocket('ws://localhost:3030/stream/japan');
    this.socket.addEventListener('open', event => {
      console.log('Socket 接続成功');
    });
    this.socket.addEventListener('message', msg => {
      const tweets = JSON.parse(msg.data);
      this.Tweets = [...this.Tweets, ...this.serializeTweets([tweets])];
      this.Tweets.filter((tweet: any) => tweet.place).forEach((tweet: any) => {
        this.map.putMarker(tweet);
      });
    });
  }

  private serializeTweets(tweets: any[]) {
    return tweets.map((tweet: any) => {
      const createdAt = `${new Date(tweet.created_at).getFullYear()}-${new Date(
        tweet.created_at,
      ).getMonth() + 1}-${new Date(tweet.created_at).getDate()} ${new Date(
        tweet.created_at,
      ).getHours()}:${new Date(tweet.created_at).getMinutes()}`;

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
  }
}
