import { Camp } from './../entities/Camp';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class DonationService {
    url = 'http://localhost:18080/refugeesCamp-web/api/donations';

    constructor(private http: HttpClient) {}
    public generatedonation(currency :string,amount:number) :Observable<any>{
        return this.http.get(this.url+"/add?amount="+amount+"&currency="+currency);
    }
    public generatedonationForCamp(currency :string,amount:number, campid : number) :Observable<any>{
        return this.http.get(this.url+"/addtocamp?amount="+amount+"&currency="+currency+"&camp_id="+campid);
    }
    public getCamps() : Observable<Camp[]>{
        return this.http.get<Camp[]>("http://localhost:18080/refugeesCamp-web/api/camps");
    }
}