import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { TwitterService } from './twitter.service';

describe('TwitterService', () => {
  let service: TwitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, TwitterService],
    });

    service = TestBed.get(TwitterService);
  });

  it('should create the service', () => {
    // assert
    expect(service).toBeDefined();
  });
});
