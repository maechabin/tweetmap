import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { TwitterRepository } from './twitter.repository';

describe('TwitterRepository', () => {
  let service: TwitterRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, TwitterRepository],
    });

    service = TestBed.get(TwitterRepository);
  });

  it('should create the service', () => {
    // assert
    expect(service).toBeDefined();
  });
});
