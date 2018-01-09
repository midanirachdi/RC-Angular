import {
  Component, ChangeDetectionStrategy, OnInit, Input, Inject, Injector, ElementRef,
  ViewChild
} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {News} from "../../../../entities/news";
import {ProfileComponent} from "../../profile.component";
import {NewsService} from "../../../../services/news.services";
import {Router} from "@angular/router";
import {MediaService} from "../../../../services/mediaupload.services";
import {Media} from "../../../../entities/media";

@Component({
  selector: 'app-addnews',
  templateUrl: './addnews.component.html',
  styleUrls: ['./addnews.component.css'],
  providers: [NewsService,MediaService]
})
export class AddnewsComponent implements OnInit {
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
/******Upload Image ********/
  currentMedia=new Media();
  @Input() multiple: boolean = false;
  @ViewChild('fileInput') inputEl: ElementRef;
  upload(){
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;

    this.mediaService.upload(inputEl).subscribe((res)=>{
      console.log(res.path);
      this.initialContentTwo=this.initialContentTwo+'<br><img src="'+res.path+'" alt=""><br>'
    });

  }
  /**********/
  ngOnInit() {
  }
  constructor(private inj:Injector,private router: Router, private newsService: NewsService,private mediaService:MediaService ) {

    //Initial content update.
    /* setTimeout(() => {
     this.update$.next(); // this is needed only when you use ChangeDetectionStrategy.OnPush strategy
     },2000);*/
  }



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
