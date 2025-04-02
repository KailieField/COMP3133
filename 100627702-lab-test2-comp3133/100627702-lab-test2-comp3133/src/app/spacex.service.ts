import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({

  providedIn: 'root'

})

export class SpacexService {

  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) { }

  getLaunches(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  getLaunchesByUrl(url: string): Observable<any[]> {
    return this.http.get<any[]>(url);
  }

  getLaunchByFlightNumber(flightNumber: number): Observable<any> {
    const url = `https://api.spacexdata.com/v3/launches/${flightNumber}`;
    return this.http.get<any>(url);
  }
}
