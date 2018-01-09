/**
 * Created by Salim on 12/12/2017.
 */

import {HttpHeaders, HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';
import {Injectable, Injector} from "@angular/core";
import {Router} from "@angular/router";
import {Media} from "../entities/media";


@Injectable()
export class MediaService {
  private router: Router;

  token='Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6Miwicm9sZSI6IkFkbWluIn0.i92d_eSdnQrfXCYf1JlQlmiaHDKNRhreWThoH2rT0F8b_tjzukRiAq8Qc4ASjYpEVAJWc5wKxT-FtCtrBvRNwg';
  url='http://localhost:18080/refugeesCamp-web/api/news';
  header: HttpHeaders;


  httpOptions = {
    headers : new HttpHeaders({ 'Authorization': this.token , 'Content-Type': 'application/json'})
  };
  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', this.token);
    headers.append('Content-Type', "application/json");
  }
  constructor(private http: HttpClient,private injector:Injector) {

    this.router = this.injector.get(Router);
    this.header = new HttpHeaders();
    this.header.set('Authorization', this.token);
    this.header.set('Content-Type', 'application/json');



  }

  public upload(inputEl: HTMLInputElement) : Observable<any> {
    let media=new Media();
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('file[]', inputEl.files.item(i));
      }
      return this.http
        .post('http://localhost:18080/refugeesCamp-web/api/media', formData);
      // do whatever you do...
      // subscribe to observable to listen for response
    }
  }
}
