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

  it('handleStreamChackChange', () => {
    // arrange
    const event = {
      checked: true,
    } as any;
    const emitSpy = spyOn((component as any).streamCheckChange, 'emit');

    // act
    component.handleStreamChackChange(event);

    // assert
    expect(emitSpy).toHaveBeenCalledWith(event.checked);
  });

  it('handleLocationOnlyFilterChange', () => {
    // arrange
    const event = {
      checked: true,
    } as any;
    const emitSpy = spyOn((component as any).locationOnlyFilterChange, 'emit');

    // act
    component.handleLocationOnlyFilterChange(event);

    // assert
    expect(emitSpy).toHaveBeenCalledWith(event.checked);
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

  it('trackItem', () => {
    // arrange
    const expected = {
      id: 'AAA',
    };

    // act
    const recieved = component.trackItem(1, expected);

    // assert
    expect(recieved).toBe(expected.id);
  });
});
