import { Component, OnInit } from '@angular/core';
import {News} from "../../../../entities/news";
import {NewsService} from "../../../../services/news.services";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-editnews',
  templateUrl: './editnews.component.html',
  styleUrls: ['./editnews.component.css'],
  providers: [NewsService]
})
export class EditnewsComponent implements OnInit {

  id: number;
  news=new News();
  currentNews=new News();
  newsSub= new Subscription();

  constructor(private route: ActivatedRoute, private newsService: NewsService,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.id=params['id'];
      this.getNewsById(params['id']);

      console.log(this.currentNews);
    });
  }

  getNewsById(id : number):void{
    this.newsService.GetById(id).subscribe((arr) =>{
      this.news = <News>arr;
      this.currentNews.id=this.news.id;
      this.currentNews.author=this.news.author;
      this.currentNews.content=this.news.content;
      this.currentNews.dateOfCreation=this.news.dateOfCreation;
      this.currentNews.location=this.news.location;
      this.currentNews.title=this.news.title;
      return this.news;
    });

  }

  onSubmit() {
    console.log(this.currentNews);
    this.newsSub=this.newsService.updateNews(this.currentNews).subscribe(e=>console.log("Updated :D"));
    this.currentNews=new News();
    this.router.navigate(['profile/managenews']);

  }
  ngOnDestroy(){
    this.newsSub.unsubscribe();
  }

}
