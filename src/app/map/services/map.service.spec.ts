import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { of } from 'rxjs';

import { TwitterService } from '../../core/twitter.service';
import { SpinnerService } from '../../core/spinner.service';
import { MapService } from './map.service';

describe('MapService', () => {
  let service: MapService;
  let spinnerService: SpinnerService;
  let twitterService: TwitterService;
  const twitterServiceStub = {
    search: () =>
      of({
        result: {
          statuses: [
            {
              created_at: 'Mon Nov 18 15:20:10 +0000 2019',
              id: 'ID',
              id_str: 'ID_STR',
              place: {
                name: 'PLACE_NAME',
                bounding_box: {
                  coordinates: [
                    [
                      [1111, 2222],
                      [3333, 2222],
                      [3333, 4444],
                      [1111, 4444],
                    ],
                  ],
                },
              },
              text: 'TEXT',
              user: {
                screen_name: 'SCREEN_NAME',
                profile_image_url_https: 'PROFILE_IMAGE_URL_HTTPS',
              },
            },
          ],
        },
      }).toPromise(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        Overlay,
        MapService,
        SpinnerService,
        { provide: TwitterService, useValue: twitterServiceStub },
      ],
    });

    service = TestBed.get(MapService);
    spinnerService = TestBed.get(SpinnerService);
    twitterService = TestBed.get(TwitterService);
  });

  it('should create the servcie', () => {
    // assert
    expect(service).toBeDefined();
  });

  it('initMap', fakeAsync(() => {
    // arrange
    const mapElem = document.createElement('div');
    const initMapSpy = spyOn((service as any).map, 'initMap');

    // act
    service.initMap(mapElem);
    tick();

    // assert
    expect(initMapSpy).toHaveBeenCalledWith(mapElem);
  }));

  it('panTo', () => {
    // arrange
    const panToSpy = spyOn((service as any).map, 'panTo');
    const latlng = {
      lat: 123,
      lng: 456,
    };

    // act
    service.panTo(latlng);

    // assert
    expect(panToSpy).toHaveBeenCalledWith(latlng);
  });

  it('getTweets', fakeAsync(() => {
    // arrage
    const query = 'TEST';
    const startSpinnerSpy = spyOn(spinnerService, 'startSpinner');
    const stopSpinnerSpy = spyOn(spinnerService, 'stopSpinner');
    const clearMarkerSpy = spyOn((service as any).map, 'clearMarker');
    const searchSpy = spyOn(twitterService, 'search').and.callThrough();
    const putMarkerSpy = spyOn((service as any).map, 'putMarker');

    // act
    service.getTweets(query);
    tick();

    // assert
    expect(startSpinnerSpy).toHaveBeenCalled();
    expect(searchSpy).toHaveBeenCalledWith(query);
    expect(clearMarkerSpy).toHaveBeenCalled();
    expect(stopSpinnerSpy).toHaveBeenCalled();
    expect(putMarkerSpy).toHaveBeenCalledTimes(1);
  }));

  it('serializeTweets', fakeAsync(() => {
    // arrange
    const query = 'TEST';
    const getCreatedAt = (date: string) => {
      return `${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(
        date,
      ).getDate()} ${new Date(date).getHours()}:${new Date(date).getMinutes()}`;
    };
    const expected = [
      {
        id: 'ID',
        lng: 2222,
        lat: 3333,
        name: 'SCREEN_NAME',
        img: 'PROFILE_IMAGE_URL_HTTPS',
        link: 'https://twitter.com/SCREEN_NAME/status/ID_STR',
        text: 'TEXT',
        createdAt: getCreatedAt('Mon Nov 18 15:20:10 +0000 2019'),
        place: 'PLACE_NAME',
      },
    ];
    spyOn(spinnerService, 'startSpinner');
    spyOn(spinnerService, 'stopSpinner');
    spyOn((service as any).map, 'clearMarker');
    spyOn(twitterService, 'search').and.callThrough();
    spyOn((service as any).map, 'putMarker');

    // act
    service.getTweets(query);
    tick();

    // assert
    expect((service as any).tweets).toEqual(expected);
  }));
});
