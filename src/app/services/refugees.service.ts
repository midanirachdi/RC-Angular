import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Refugee } from '../entities/refugee';
import { Observable } from 'rxjs/Observable';
import { REFUGEES_URL } from './java.urls';

@Injectable()
export class RefugeesService {

  // token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJpZCI6Mywicm9sZSI6IkNhbXBDaGVmIn0.W8_n4zNk3-7wGttYWkSreT6wuLtkemuKJ3-Pq9_vZJhSjQfa2NLaPCtGFZRk0LbrBKaar3k4ApTS_jdwkUcH5Q';

  header: HttpHeaders;
  httpOptions = new HttpHeaders({ 'Content-Type': 'application/json'});
  constructor(private http: HttpClient) {
  }

  public GetAllRefugees(): Observable<Refugee[]> {
    return this.http.get<Refugee[]>(REFUGEES_URL);
  }

  public AddRefugee(r: Refugee): Observable<any> {
      return this.http.post(REFUGEES_URL, JSON.stringify(r), {headers: this.httpOptions , responseType : 'text'});
  }

  public updateRefugee(r: Refugee) {
    return this.http.put(REFUGEES_URL, JSON.stringify(r), {headers: this.httpOptions , responseType : 'text'});
  }

  public delete(r: Refugee) {
    return this.http.delete(REFUGEES_URL + '/' + r.id, {headers: this.httpOptions , responseType : 'text'});
  }

  public getRefugeesPerGender(gender: string) {
    return this.http.get(REFUGEES_URL + '/stats?sex=' + gender);
  }

  public getRefugeesPerAge() {
    return this.http.get(REFUGEES_URL + '/AgeCategory');
  }

}
