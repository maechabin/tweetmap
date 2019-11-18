import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { TweetsComponent } from './tweets.component';

describe('TweetsComponent', () => {
  let component: TweetsComponent;
  let fixture: ComponentFixture<TweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TweetsComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    // assert
    expect(component).toBeDefined();
  });

  it('handleTweetClick', () => {
    // arrange
    const lat = 123;
    const lng = 456;
    const emitSpy = spyOn((component as any).tweetClick, 'emit');
    const expected = {
      lat,
      lng,
    };

    // act
    component.handleTweetClick(lat, lng);

    // assert
    expect(emitSpy).toHaveBeenCalledWith(expected);
  });
});
