import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Car } from './car';

@Injectable()
export class CarService {
  carsUrl = 'http://localhost:8080/cars';

  constructor(private http: Http) {
  }

  getCars(): Observable<Car[]> {
    return this.http.get(this.carsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addCar(car: Car): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: cpHeaders});
    return this.http.post(this.carsUrl, car, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  deleteCarById(carId: string): Observable<number> {
    let cpHeaders = new Headers({'Content-Type': 'application/json'});
    let cpParams = new URLSearchParams();
    cpParams.set('id', carId);
    let options = new RequestOptions({headers: cpHeaders, params: cpParams});
    return this.http.delete(this.carsUrl, options)
      .map(success => success.status)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
