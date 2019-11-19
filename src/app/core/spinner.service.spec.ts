import { TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';

import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Overlay, SpinnerService],
    });

    service = TestBed.get(SpinnerService);
  });

  it('should create the service', () => {
    // assert
    expect(service).toBeDefined();
  });
});
