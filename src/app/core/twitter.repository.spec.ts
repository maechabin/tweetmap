import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';

import { TwitterRepository } from './twitter.repository';

describe('TwitterRepository', () => {
  let http: HttpClient;
  let service: TwitterRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, TwitterRepository],
    });

    http = TestBed.get(HttpClient);
    service = TestBed.get(TwitterRepository);
  });

  it('should create the service', () => {
    // assert
    expect(service).toBeDefined();
  });

  it('search', fakeAsync(() => {
    // arrange
    (service as any).SearchApi = 'AAA';
    const keyword = 'BBB';
    const getSpy = spyOn(http, 'get').and.returnValue(of('CCC'));
    const params = {
      ...new HttpParams(),
      params: { keyword },
    };

    // act
    service.search(keyword).then(a => {
      // assert
      expect(a).toBe('CCC');
      tick();
    });

    // assert
    expect(getSpy).toHaveBeenCalledWith('AAA', params);
  }));

  it('stream', () => {
    // arrange
    const ws = 'ws://localhost/';
    (service as any).SearchApi = ws;
    const keyword = 'BBB';
    const expected = new WebSocket(`${ws}${keyword}`);

    // act
    const recieved = service.stream(keyword);

    // assert
    expect(recieved).toEqual(expected);
  });
});
