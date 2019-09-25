import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TwitterService {
  private readonly searchApi =
    'https://twitter-functions.netlify.com/.netlify/functions/search';

  constructor(private http: HttpClient) {}

  search(keyword?: string): Promise<any> {
    const params = {
      ...new HttpParams(),
      params: keyword ? { keyword } : null,
    };

    return this.http.get(`${this.searchApi}`, params).toPromise();
  }
}
