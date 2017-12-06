import { Component, OnInit } from '@angular/core';
import {News} from "../../entities/news";
import {NewsService} from "../../services/news.services";
import {ActivatedRoute, Router, Params} from "@angular/router";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-singlepostfull',
  templateUrl: './singlepostfull.component.html',
  styleUrls: ['./singlepostfull.component.css'],
  providers: [NewsService]
})
export class SinglepostfullComponent implements OnInit {

  id: number;
  //private sub: any;
  news: News;


  constructor(private route: ActivatedRoute, private newsService: NewsService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id=params['id'];
      this.getNewsById(params['id']);
      if(this.newsService.GetById(params['id']).isEmpty)
      {
        console.log('fuck off')
      }
    });

  }
  getNewsById(id : number):void{
    this.newsService.GetById(id).subscribe(arr =>this.news = <News>arr);

  }
}
