import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.scss'],
})
export class TweetsComponent {
  @Input() tweets: any[];
  @Input() isStreamChecked: boolean;
  @Input() isLocationOnly: boolean;
  @Output() private readonly streamCheckChange = new EventEmitter<boolean>();
  @Output() private readonly locationOnlyFilterChange = new EventEmitter<boolean>();
  @Output() private readonly tweetClick = new EventEmitter<{ lat: number; lng: number }>();

  handleStreamChackChange($event: MatCheckboxChange): void {
    this.streamCheckChange.emit($event.checked);
  }

  handleLocationOnlyFilterChange($event: MatCheckboxChange): void {
    this.locationOnlyFilterChange.emit($event.checked);
  }

  handleTweetClick(lat: number, lng: number): void {
    if (lat && lng) {
      this.tweetClick.emit({
        lat,
        lng,
      });
    }
  }

  trackItem(index: number, tweet: any) {
    return tweet.id;
  }
}
