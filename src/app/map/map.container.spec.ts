import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { of } from 'rxjs';

import { MapContainerComponent } from './map.container';
import { MapService } from './map.service';

describe('MapContainerComponent', () => {
  let component: MapContainerComponent;
  let fixture: ComponentFixture<MapContainerComponent>;
  let mapService: MapService;
  let location: Location;
  const routerStub = {
    events: of({ url: '?q=TEST' }),
  };
  const locationStub = {
    replaceState: () => 'replaceState',
  };
  const mapServiceStub = {
    panTo: () => 'panTo',
    getTweets: () => 'getTweets',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapContainerComponent],
      providers: [
        HttpClient,
        HttpHandler,
        Overlay,
        { provide: Router, useValue: routerStub },
        { provide: Location, useValue: locationStub },
        { provide: MapService, useValue: mapServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapContainerComponent);
    component = fixture.componentInstance;

    mapService = TestBed.get(MapService);
    location = TestBed.get(Location);
  });

  it('should create the component', () => {
    // assert
    expect(component).toBeDefined();
  });

  it('handleMenuClick', () => {
    // arrange
    (component as any).sidenav = {
      toggle: jasmine.createSpy(),
    };

    // act
    component.handleMenuClick();

    // assert
    expect((component as any).sidenav.toggle).toHaveBeenCalled();
  });

  it('handleTweetClick', () => {
    // arrange
    const panToSpy = spyOn(mapService, 'panTo');
    const latlng = {
      lat: 123,
      lng: 456,
    };

    // act
    component.handleTweetClick(latlng);

    // assert
    expect(panToSpy).toHaveBeenCalledWith(latlng);
  });

  describe('handleSearchButtonClick', () => {
    it('should call method', () => {
      // arrange
      const event = 'TEST';
      const replaceStateSpy = spyOn(location, 'replaceState');
      const expectReplaceState = `?q=${event}`;
      const getTweetsSpy = spyOn(mapService, 'getTweets');

      // act
      component.handleSearchButtonClick(event);

      // assert
      expect(replaceStateSpy).toHaveBeenCalledWith(expectReplaceState);
      expect(getTweetsSpy).toHaveBeenCalledWith(event);
    });

    it('should properly determine mobileQuery: true', fakeAsync(() => {
      // arrange
      (component as any).sidenav = {
        open: jasmine.createSpy(),
      };
      (component as any).mobileQuery = {
        matches: true,
      };

      // act
      component.handleSearchButtonClick('TEST');
      tick();

      // assert
      expect((component as any).sidenav.open).toHaveBeenCalled();
    }));

    it('should properly determine mobileQuery: false', fakeAsync(() => {
      // arrange
      (component as any).sidenav = {
        open: jasmine.createSpy(),
      };
      (component as any).mobileQuery = {
        matches: false,
      };

      // act
      component.handleSearchButtonClick('TEST');
      tick();

      // assert
      expect((component as any).sidenav.open).not.toHaveBeenCalled();
    }));
  });
});
