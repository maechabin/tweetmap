import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    // assert
    expect(component).toBeDefined();
  });

  it('handleMenuClick', () => {
    // arrange
    const emitSpy = spyOn((component as any).menuClick, 'emit');

    // act
    component.handleMenuClick();

    // assert
    expect(emitSpy).toHaveBeenCalled();
  });
});
