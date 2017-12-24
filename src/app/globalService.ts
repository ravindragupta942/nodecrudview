import { Injectable, EventEmitter, Input, Output } from '@angular/core';
import { Http, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalService {

    basePath: string;
    requestoptions: any

    constructor(public http: Http) {
        this.basePath = 'http://localhost:8080/'
    }

    postMethod(url, data) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(data);
        return this.http.post(url, body, options)
    }

    putMethod(url, data) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify(data);
        return this.http.put(url, body, options)
    }

    // postMethodUnotherised(url, data) {
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     let body = JSON.stringify(data);
    //     return this.http.post(url, body, options)
    // }

    getMethod(url){
        return this.http.get(url)
    }

    deleteMethod(url){
        return this.http.delete(url)
    }


}
