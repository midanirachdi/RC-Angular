import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../../services/news.services";
import {News} from "../../../entities/news";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-managenews',
  templateUrl: './managenews.component.html',
  styleUrls: ['./managenews.component.css'],
  providers: [NewsService]

})
export class ManagenewsComponent implements OnInit {

  news: News[]= new Array();
  newsSub:Subscription;
  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.getNews();
  }

  getNews(){
    this.newsSub=this.newsService.GetAllNews().subscribe(news =>this.news = news);
  }

  ngOnDestroy(){
    this.newsSub.unsubscribe();
  }
}
