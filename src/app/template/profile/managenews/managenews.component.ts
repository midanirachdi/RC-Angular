import {Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import {NewsService} from "../../../services/news.services";
import {News} from "../../../entities/news";
import {Subscription, Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {Media} from "../../../entities/media";
import {MediaService} from "../../../services/mediaupload.services";

@Component({
  selector: 'app-managenews',
  templateUrl: './managenews.component.html',
  styleUrls: ['./managenews.component.css'],
  providers: [NewsService,MediaService]

})
export class ManagenewsComponent  {

  //id:number;
  news: News[]= new Array();
  newsSub:Subscription;
  constructor(private newsService: NewsService,private route: ActivatedRoute,private mediaService:MediaService) { }

  ngOnInit() {
    this.getNews();
  }

  getNews(){
    this.newsSub=this.newsService.GetAllNews().subscribe(news =>this.news =  [...news]);
  }

  /******Upload Image ********/
  currentMedia=new Media();
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  upload(id:number){
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;

    this.mediaService.upload(inputEl).subscribe((res)=>{
      console.log(res.path);
      this.currentMedia=res;

      this.newsService.GetById(id).subscribe((e)=>{
        let n=<News> e;
        n.mainPhoto=this.currentMedia.path;
        console.log(n);
        this.newsSub= this.newsService.updateNews(n).subscribe();
      });

    });
  }
  /**********/
   deleteNews (id:number){
     this.newsService.GetById(id).subscribe((e)=>{
        let naaad=<News> e;
         try{this.newsSub= this.newsService.deleteNews(naaad).subscribe(e=>{
           this.getNews();
           console.log(this.news);
        });}catch(e){
          this.getNews();
           console.log("fffffffffffff");
           console.log(this.news);
         }
    });
   }

  ngOnDestroy(){
    this.newsSub.unsubscribe();
  }
}
