import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mission } from './model/interface.model'


@Injectable({

  providedIn: 'root'

})

export class SpacexService {

  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) { }

  getLaunches(): Observable<Mission>{
    return this.http.get<Mission>(this.apiUrl);
  }

  getLaunchesByUrl(url: string): Observable<Mission> {
    return this.http.get<Mission>(url);
  }

  getLaunchByFlightNumber(flightNumber: number): Observable<Mission> {
    const url = `${this.apiUrl}/${flightNumber}`; //https://api.spacexdata.com/v3/launches/${flightNumber}
    return this.http.get<Mission>(url);
  }
}
