import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TwitterService {
  private readonly SearchApi = 'https://twitter-functions.netlify.com/.netlify/functions/search';

  constructor(private http: HttpClient) {}

  search(keyword?: string): Promise<any> {
    const params = {
      ...new HttpParams(),
      params: keyword ? { keyword } : null,
    };

    return this.http.get(`${this.SearchApi}`, params).toPromise();
  }

  }
}
