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
  @Output() private readonly streamCheckChange = new EventEmitter<boolean>();
  @Output() private readonly tweetClick = new EventEmitter<{ lat: number; lng: number }>();

  handleStreamChackChange($event: MatCheckboxChange) {
    this.streamCheckChange.emit($event.checked);
  }
  handleTweetClick(lat: number, lng: number) {
    if (lat && lng) {
      this.tweetClick.emit({
        lat,
        lng,
      });
    }
  }
}
