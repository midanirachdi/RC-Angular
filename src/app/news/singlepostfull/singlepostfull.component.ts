import { Component, OnInit } from '@angular/core';
import {News} from "../../entities/news";
import {NewsService} from "../../services/news.services";
import {ActivatedRoute, Router, Params} from "@angular/router";
import 'rxjs/add/operator/map';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-singlepostfull',
  templateUrl: './singlepostfull.component.html',
  styleUrls: ['./singlepostfull.component.css'],
  providers: [NewsService]
})
export class SinglepostfullComponent implements OnInit {

  id: number;
  news=new News();
  public href: string = "";
  newsSub:Subscription;
  public shortname="refugeescamps-tn";



  constructor(private route: ActivatedRoute, private newsService: NewsService,private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params); //log the entire params object
      console.log(params['id']); //log the value of id
      this.id=params['id'];
      this.getNewsById(params['id']);

    });

  }
  getNewsById(id : number):void{
    this.newsSub=this.newsService.GetById(id).subscribe(arr =>this.news = <News>arr);
    this.href = this.router.url;
  }
  ngOnDestroy(){
    this.newsSub.unsubscribe();
  }
}
