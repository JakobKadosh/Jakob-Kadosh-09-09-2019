import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  currentConditions: any = null;
  searchText: string = '';
  apiKey = "BX5B2IpMXvd87AQCjBinaCW2PXLxfzdW"
  baseUrl = "https://dataservice.accuweather.com"
  tempUnit;
  constructor(private http: HttpClient) { }


  public autocompleteCity(cityName: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${cityName}`);

  }
  public getCityDetails(cityKey: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/locations/v1/${cityKey}?apikey=${this.apiKey}`);
  }
  public getCurrentConditions(key: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/currentconditions/v1/${key}?apikey=${this.apiKey}`);

  }

  public get5DayForcasts(key: number, metric): Observable<any> {
    if (metric) {
      metric = "true"
    } metric = "false"
    return this.http.get<any>(`${this.baseUrl}/forecasts/v1/daily/5day/${key}?apikey=${this.apiKey}`)
  }
}

