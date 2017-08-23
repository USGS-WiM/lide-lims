import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { APP_SETTINGS } from '../app.settings'

import { IAnalysisBatch } from './analysis-batch'



@Injectable()
export class AnalysisBatchService {

  constructor(private _http: Http) { }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
  }

  //getAnalysisBatches function  - makes request to lide web services
  getAnalysisBatches(): Observable<IAnalysisBatch[]> {

    let options = new RequestOptions({ headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS });

    return this._http.get(APP_SETTINGS.ANALYSIS_BATCHES_URL, options)
                .map((response: Response) => <IAnalysisBatch[]>response.json())
                //.do(data => console.log('Analysis Batch data: ' + JSON.stringify(data)))
                .catch(this.handleError);
  }

  public create(formValue: IAnalysisBatch): Observable<IAnalysisBatch[]> {
    
        let options = new RequestOptions({
          headers: APP_SETTINGS.AUTH_JSON_HEADERS
        });
    
        return this._http.post(APP_SETTINGS.ANALYSIS_BATCHES_URL, formValue, options)
          .map(this.extractData)
          .catch(this.handleError)
    
      }
    
      public update(formValue: IAnalysisBatch): Observable<IAnalysisBatch> {
    
        let options = new RequestOptions({
          headers: APP_SETTINGS.MIN_AUTH_JSON_HEADERS
        });
    
        return this._http.put(APP_SETTINGS.ANALYSIS_BATCHES_URL + formValue.id + '/', formValue, options)
          .map(this.extractData)
          .catch(this.handleError);
    
      }
    

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
