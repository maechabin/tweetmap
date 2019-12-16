import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { Location } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';

import { MapService } from './services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.container.html',
  styleUrls: ['./map.container.scss'],
})
export class MapContainerComponent implements OnInit {
  @ViewChild('sidenav', { static: false }) private readonly sidenav: MatSidenav;

  keyword: string;
  readonly mobileQuery: MediaQueryList = this.media.matchMedia('(max-width: 720px)');
  private el: HTMLElement;

  constructor(
    public mapService: MapService,
    private elementRef: ElementRef,
    private router: Router,
    private media: MediaMatcher,
    private location: Location,
  ) {}

  ngOnInit() {
    this.initMap();

    this.router.events.subscribe(async val => {
      if (val instanceof RoutesRecognized) {
        this.keyword = val.url.split('=')[1] ? decodeURI(val.url.split('=')[1]) : '';
        if (this.keyword) {
          await this.mapService.getTweets(this.keyword);
        }
        if (this.mobileQuery.matches) {
          this.sidenav.open();
        }
      }
    });
  }

  /** ヘッダーのハンバーガーメニューをクリックした時の処理 */
  handleMenuClick(): void {
    this.sidenav.toggle();
  }

  handleStreamCheckChange(isStreamChecked: boolean) {
    console.log(isStreamChecked);
    if (isStreamChecked) {
      this.mapService.getStream();
    } else {
      this.mapService.stopGetStream();
    }
  }

  handleTweetClick(latlng: { lat: number; lng: number }): void {
    this.mapService.panTo(latlng);
  }

  async handleSearchButtonClick(event: string): Promise<void> {
    this.location.replaceState(`?q=${event}`);
    await this.mapService.getTweets(event);
    if (this.mobileQuery.matches) {
      this.sidenav.open();
    }
  }

  private initMap() {
    this.el = this.elementRef.nativeElement;
    const mapElem = this.el.querySelector('.map') as HTMLElement;
    this.mapService.initMap(mapElem);
  }
}
