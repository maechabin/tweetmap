import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import { Overlay } from '@angular/cdk/overlay';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Location } from '@angular/common';
import { of } from 'rxjs';

import { MapContainerComponent } from './map.container';

describe('ControlComponent', () => {
  let component: MapContainerComponent;
  let fixture: ComponentFixture<MapContainerComponent>;
  const routerStub = {
    events: of({ url: '?q=TEST' }),
  };
  const locationStub = {
    replace: () => 'replace',
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
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    // assert
    expect(component).toBeDefined();
  });
});
