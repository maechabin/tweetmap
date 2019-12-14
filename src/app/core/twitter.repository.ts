import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TwitterRepository {
  private readonly SearchApi = 'https://twitter-functions.netlify.com/.netlify/functions/search';
  private readonly StreamApi = 'http://localhost:9001/.netlify/functions/stream';

  constructor(private http: HttpClient) {}

  search(keyword?: string): Promise<any> {
    const params = {
      ...new HttpParams(),
      params: keyword ? { keyword } : null,
    };

    return this.http.get(`${this.SearchApi}`, params).toPromise();
  }

  stream(keyword?: string): Promise<any> {
    const params = {
      ...new HttpParams(),
      params: keyword ? { keyword } : null,
    };

    return this.http.get(`${this.StreamApi}`, params).toPromise();
  }
}
