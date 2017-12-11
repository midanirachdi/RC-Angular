import { User } from './../entities/User';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Evenement } from '../entities/Evenement';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class EvenementService {
  // tslint:disable-next-line:max-line-length
  url= 'http://localhost:18080/refugeesCamp-web/api/evenements';
  header: HttpHeaders;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) {
    this.header = new HttpHeaders();
    this.header.set('Content-Type', 'application/json');

  }

  public GetAllEvenements() : Observable<Evenement[]>{
    return this.http.get<Evenement[]>(this.url);
  }

  public GetEvenement(id) : Observable<Evenement>{
    return this.http.get<Evenement>(this.url+"/"+id);
  }

  public GetMyEvents(id) : Observable<Evenement[]>{
    return this.http.get<Evenement[]>(this.url+"/myevents/"+id);
  }
  public GetCreator(id) : Observable<User>{
    return this.http.get<User>(this.url+"/creator/"+id);
  }
  public GetUpcoming() : Observable<Evenement[]>{
    return this.http.get<Evenement[]>(this.url+"/upcoming");
  }

  public AddEvenement(e: Evenement) {
      return this.http.post(this.url, JSON.stringify(e), this.httpOptions);
  }

  public updateRefugee(e: Evenement) {
    return this.http.put(this.url, JSON.stringify(e));
  }

  public delete(e: Evenement) {
    return this.http.delete(this.url + '/' + e.id, this.httpOptions);
  }

}
