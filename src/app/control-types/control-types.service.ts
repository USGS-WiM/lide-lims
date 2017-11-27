import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings';
import { IControlType } from 'app/control-types/control-type';


@Injectable()
export class ControlTypeService {

  constructor(private _http: Http) { }

  getControlTypes(): Observable<IControlType[]> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.CONTROL_TYPES_URL, options)
      .map((response: Response) => <IControlType[]>response.json())
      // .do(data => console.log('Sample types data: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public create(formValue: IControlType): Observable<IControlType> {
    let options = new RequestOptions({ headers: APP_SETTINGS.AUTH_JSON_HEADERS });

    return this._http.post(APP_SETTINGS.CONTROL_TYPES_URL, formValue, options)
      .map((response: Response) => <IControlType>response.json())
      .catch(this.handleError);
  }

  public update(formValue: IControlType): Observable<IControlType> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.put(APP_SETTINGS.CONTROL_TYPES_URL + formValue.id + '/', formValue, options)
      .map((response: Response) => <IControlType>response.json())
      .catch(this.handleError);
  }

  public delete(id: number): Observable<IControlType> {
    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.delete(APP_SETTINGS.CONTROL_TYPES_URL + id, options)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
