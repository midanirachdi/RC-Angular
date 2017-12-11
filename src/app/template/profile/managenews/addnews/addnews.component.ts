import {Component, ChangeDetectionStrategy, OnInit, Input, Inject, Injector} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {News} from "../../../../entities/news";
import {ProfileComponent} from "../../profile.component";
import {NewsService} from "../../../../services/news.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.css'],
  providers: [NewsService]
})
export class AddnewsComponent implements OnInit {
  @Input()
  ngOnInit() {
  }
  constructor(private inj:Injector,private router: Router, private newsService: NewsService) {

    //Initial content update.
    /* setTimeout(() => {
     this.update$.next(); // this is needed only when you use ChangeDetectionStrategy.OnPush strategy
     },2000);*/
  }


  public currentNews:News=new News();
  public showPreview: boolean = false;
  public initialContentTwo: string = `Text Here...`
  public contentTwo: string;
  public update$: Subject<any> = new Subject();
  public options1: any = {
    autogrow: true,
    removeformatPasted: true,
    semantic: false,
    btns: [['bold', 'italic'], ['link'],['foreColor', 'backColor'], ['preformatted'], ['noembed']],
    lang: 'fr'
  };

  public options2: any = {
    lang: 'fr'
  };

  togglePreview() {
    console.log(this.contentTwo);
    this.initialContentTwo=this.contentTwo;
    this.showPreview = !this.showPreview;
    /*if(this.showPreview) this.update$.next();*/

  }
  addNews(){
    let nws=new News();
    nws.title=this.currentNews.title;
    nws.content=this.contentTwo;
    nws.location=this.currentNews.location;
    let today:any = Date.now();
    nws.dateOfCreation=today;

    console.log(nws);
    let parentComponent = this.inj.get(ProfileComponent);
    console.log(parentComponent.user);
    nws.author=parentComponent.user.firstName+" "+parentComponent.user.lastName;
    this.newsService.AddNews(nws);
    this.router.navigate(['profile/managenews']);
  }



}
