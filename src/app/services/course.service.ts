import { Injectable } from '@angular/core';
import   'rxjs/add/operator/map'
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import {Response} from "@angular/http";
import {Course} from "../entities/course";

@Injectable()
export class CourseService {

  url="http://localhost:18080/refugeesCamp-web/api/course";
  urlUserService = "http://localhost:18080/refugeesCamp-web/api/users";
  constructor( private httpC: HttpClient) {

  }

  public getAll() {

    return this.httpC.get(this.url)
      .catch(
        (error: Response) => {
          return Observable.throw(error.status + " " + error.statusText)
        });
  }

  public add(co :Course) {
    return this.httpC.post(this.url, co);
  }

  public update(c:Course) {
    return this.httpC.put(this.url, c);
  }

  public delete(c:Course) {
    return this.httpC.delete(this.url + '/' + c.id);
  }


  getCourseById(course_id: number) {
    return this.httpC.get(this.url + '/' + course_id)
      .catch(
        (error: Response) => {
          return Observable.throw(error.status + " " + error.statusText)
        });
  }

}
