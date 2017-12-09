import { News } from '../entities/news';
import { Component, OnInit } from '@angular/core';
import {NewsService} from "../services/news.services";
import {Router, ActivatedRoute} from "@angular/router";
import {LocationService} from "../services/location.service";


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsService,LocationService]
})
export class NewsComponent implements OnInit {



  onScroll () {
    console.log('scrolled!!')
  }
  news: News[]= new Array();
  p: number = 1;
  countryInfo: string;
  country: any;
  geolocationPosition: any;

  constructor(
    private newsService: NewsService,
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    //scroll to to top page when route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEvent)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    //Get location and get news by location
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.geolocationPosition = position;
            this.locationService.getUserLocation(position.coords.latitude,position.coords.longitude).subscribe(

              res=>{
                var newData = JSON.stringify(res.json());
                this.country= JSON.parse(newData);
                this.newsService.getByCountry(this.country.countryName).subscribe(news =>this.news = news);
                this.countryInfo=this.country.countryName;
              })
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              this.getNews();
              break;
            case 2:
              console.log('Position Unavailable');
              this.getNews();
              break;
            case 3:
              console.log('Timeout');
              this.getNews();
              break;
          }
        }
      );
    }

  }
  getNews(){
    this.newsService.GetAllNews().subscribe(news =>this.news = news);

  }

  scrollUp(){
    window.scrollTo(0, 0);
  }

}
