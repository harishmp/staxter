import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject('BRL');
  currentMessage = this.messageSource.asObservable();

  today = '2020-01-20';
  yesterday = '2020-01-16';

  constructor(private http: Http) { }

  // get base list
  getLatestExchangeratesapi(Base) {
    let _url: string = environment.baseUrl + 'latest?base=' + Base;
    return this.http.get(_url).map(
      res => {
        return res;
      })
      .catch(this._errorHandler);
  };

  // get historical data between two dates
  getHistoricalDataapi(start_at, end_at, Base) {
    let _url: string = environment.baseUrl + 'history?start_at=' + start_at + '&end_at=' + end_at + '&base=' + Base;
    return this.http.get(_url).map(
      res => {
        return res;
      })
      .catch(this._errorHandler);
  };

  gethistoricalrateTodaysapi() {
    let _url: string = environment.baseUrl + this.today;
    return this.http.get(_url).map(
      res => {
        return res;
      })
      .catch(this._errorHandler);
  };

  gethistoricalratesYesterdayapi() {
    let _url: string = environment.baseUrl + this.yesterday;
    return this.http.get(_url).map(
      res => {
        return res;
      })
      .catch(this._errorHandler);
  };

  // change new base value throughout the application
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  private _errorHandler(error: Response) {
    return Observable.throw(error)
  }
}
