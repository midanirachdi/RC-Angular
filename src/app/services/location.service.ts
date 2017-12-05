/**
 * Created by Salim on 12/5/2017.
 */
/**
 * Created by Salim on 12/5/2017.
 */

import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';
import {Injectable} from "@angular/core";
import {Country} from "../entities/Country";
import {Jsonp} from "@angular/http";

@Injectable()
export class LocationService {




  constructor(private http: HttpClient,private jsonp: Jsonp) {
  }


  ngOnInit() {

  }

  public getUserLocation(lat:number, lng:number) : Observable<any>{
    let apiURL = "http://ws.geonames.org/countryCodeJSON?lat="+lat+"&lng="+lng+"&username=salimism&callback=JSONP_CALLBACK";

    return this.jsonp.request(apiURL, { method: 'Get' });
  }


}
