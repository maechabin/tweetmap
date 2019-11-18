import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create the cmponent', () => {
    // assert
    expect(component).toBeDefined();
  });

  describe('isDisabled', () => {
    it('should be true', () => {
      // arrange
      (component as any).searchKeyword = null;

      // act
      const recieved = component.isDisabled;

      // assert
      expect(recieved).toBe(true);
    });

    it('should be false', () => {
      // arrange
      (component as any).searchKeyword = 'TEST';

      // act
      const recieved = component.isDisabled;

      // assert
      expect(recieved).toBe(false);
    });
  });

  it('handleKeywordInput', () => {
    // arrage
    const event = {
      target: {
        value: 'TEST',
      },
    };

    // act
    component.handleKeywordInput(event as any);

    // assert
    expect((component as any).searchKeyword).toBe(event.target.value);
  });

  it('handleSearchButtonClick', () => {
    // arrange
    const emitSpy = spyOn((component as any).searchButtonClick, 'emit');
    (component as any).searchKeyword = 'TEST';

    // act
    component.handleSerchButtonClick();

    // assert
    expect(emitSpy).toHaveBeenCalledWith('TEST');
  });
});
