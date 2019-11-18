import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss'],
})
export class TweetsComponent {
  @Input() tweets: any[];
  @Output() private readonly tweetClick = new EventEmitter<{ lat: number; lng: number }>();

  handleTweetClick(lat: number, lng: number) {
    if (lat && lng) {
      this.tweetClick.emit({
        lat,
        lng,
      });
    }
  }
}
