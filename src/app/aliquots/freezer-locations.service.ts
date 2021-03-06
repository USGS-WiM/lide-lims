import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Subject } from "rxjs/Subject";
import { APP_SETTINGS } from '../app.settings';

@Injectable()
export class FreezerLocationsService {

  constructor(private _http: Http) { }

  public getLastOccupiedSpot() {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.FREEZER_LOCATIONS_URL + '?last_occupied=true', options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError)

  }

  public getNextAvailable(studyID) {

    let options = new RequestOptions({
      headers: APP_SETTINGS.AUTH_JSON_HEADERS
    });

    return this._http.get(APP_SETTINGS.FREEZER_LOCATIONS_URL + 'get_next_available/?study=' + studyID , options)
      .map((response: Response) => <any[]>response.json())
      .catch(this.handleError)

  }


  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(JSON.stringify(error.json()) || 'Server error');
  }

}
