import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Evenement } from '../entities/Evenement';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class EvenementService {
  // tslint:disable-next-line:max-line-length
  token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6Mywicm9sZSI6IkNhbXBDaGVmIn0.W8_n4zNk3-7wGttYWkSreT6wuLtkemuKJ3-Pq9_vZJhSjQfa2NLaPCtGFZRk0LbrBKaar3k4ApTS_jdwkUcH5Q';
  url= 'http://localhost:18080/refugeesCamp-web/api/evenements';
  header: HttpHeaders;
  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': this.token , 'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) {
    this.header = new HttpHeaders();
    this.header.set('Authorization', this.token);
    this.header.set('Content-Type', 'application/json');

  }

  public GetAllEvenements() : Observable<Evenement[]>{
    return this.http.get<Evenement[]>(this.url);
  }

  public GetEvenement(id) : Observable<Evenement[]>{
    return this.http.get<Evenement[]>(this.url+"/"+id);
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
