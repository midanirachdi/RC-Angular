import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {Injector, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Stock} from "../entities/stock";
import {Observable} from "rxjs";
import {Need} from "../entities/need";
/**
 * Created by Salim on 12/12/2017.
 */

@Injectable()
export class StockService {
  private router: Router;
  token='Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6Miwicm9sZSI6IkFkbWluIn0.i92d_eSdnQrfXCYf1JlQlmiaHDKNRhreWThoH2rT0F8b_tjzukRiAq8Qc4ASjYpEVAJWc5wKxT-FtCtrBvRNwg';
  url='http://localhost:18080/refugeesCamp-web/api/stock';
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

  public getAllNews() : any{
    return this.http.get(this.url);
  }

  public getById(id: number) : Observable<any|Stock>{
    let srlink=this.url+"/"+id;
    return this.http.get<Stock>(srlink)
      .catch((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          } else {
          if (err.status == 404) {
            this.router.navigateByUrl('/error404');
          }
          console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
        return Observable.empty();
      });
  }

  public add(s: Stock) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(this.url, JSON.stringify(s),  {...this.httpOptions,responseType: 'text' }).subscribe();
  }

  public update(s: Stock) {
    return this.http.put(this.url, JSON.stringify(s),{...this.httpOptions,responseType: 'text' });
  }

  public delete(s: Stock) {
    return this.http.delete(this.url + '/' + s.id, {...this.httpOptions,responseType: 'text' });
  }



  public getAllRequestedNeeds() : any{
    return this.http.get(this.url+"/manageneeds");
  }

  public getRequestedNeedById(id: number) : Observable<any>{
    let srlink=this.url+"/manageneeds/"+id;
    return this.http.get<Stock>(srlink)
      .catch((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
        } else {
          if (err.status == 404) {
            this.router.navigateByUrl('/error404');
          }
          console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
        return Observable.empty();
      });
  }

  public updateRequestedNeed(n: Need) {
    return this.http.put(this.url+"/manageneeds/"+n.id, JSON.stringify(n),{...this.httpOptions,responseType: 'text' });
  }


  public getAllNotifications() : any{
    return this.http.get(this.url+"/notification");
  }

}
