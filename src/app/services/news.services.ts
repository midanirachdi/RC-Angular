/**
 * Created by Salim on 12/5/2017.
 */

import {HttpHeaders, HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';
import {News} from "../entities/news";
import {Injectable, Injector} from "@angular/core";
import {Router} from "@angular/router";
import {Country} from "../entities/Country";

@Injectable()
export class NewsService {
  /* to change*/
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


  ngOnInit() {

  }
  public GetAllNews() : any{
    return this.http.get(this.url);
  }

  public GetById(id: number) : Observable<any|News>{
    let srlink=this.url+"/"+id;
    return this.http.get<News>(srlink)
      .catch((err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          if (err.status == 404) {
            this.router.navigateByUrl('/error404');
          }
          console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
        }

        return Observable.empty();
      });

  }

  public getByCountry(country :string) : Observable<News[]>{
    return this.http.get<News[]>(this.url+"/country/"+country);
  }

  public AddNews(n: News) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);

    return this.http.post(this.url, JSON.stringify(n),  {...this.httpOptions,responseType: 'text' }).subscribe();
  }

  public updateNews(n: News) {
    return this.http.put(this.url, JSON.stringify(n),{...this.httpOptions,responseType: 'text' });

  }

  public deleteNews(n: News) {
    return this.http.delete(this.url + '/' + n.id, {...this.httpOptions,responseType: 'text' });
  }

}

