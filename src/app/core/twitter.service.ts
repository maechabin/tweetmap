import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TwitterService {
  private readonly searchApi =
    'http://localhost:5000/tweetmap-smaple/us-central1/search';

  constructor(private http: HttpClient) {}

  search(
    keyword?: string,
    params: HttpParams = new HttpParams(),
  ): Promise<any> {
    return this.http.get(`${this.searchApi}`).toPromise();
  }
}
