import { Component, OnInit } from '@angular/core';
import {NewsService} from "../../../services/news.services";
import {News} from "../../../entities/news";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-blogsection',
  templateUrl: './blogsection.component.html',
  styleUrls: ['./blogsection.component.css'],
  providers: [NewsService]
})
export class BlogsectionComponent implements OnInit {

  news: News[]= new Array();
  newsSub:Subscription;
  constructor(private newsService: NewsService) { }


  ngOnInit() {
    this.getNews();
  }
  getNews(){
    this.newsSub=this.newsService.GetAllNews().subscribe(news =>this.news =  [...news]);
  }

  ngOnDestroy(){
    this.newsSub.unsubscribe();
  }
}
