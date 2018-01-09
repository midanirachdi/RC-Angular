import { Component, OnInit } from '@angular/core';
import {StockService} from "../../../../services/stock.services";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {Need} from "../../../../entities/need";

@Component({
  selector: 'app-manageneeds',
  templateUrl: './manageneeds.component.html',
  styleUrls: ['./manageneeds.component.css'],
  providers: [StockService]

})
export class ManageneedsComponent implements OnInit {


  need: Need[]= new Array();
  needSub:Subscription;
  b=true;
  constructor(private stockService: StockService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.getRequestedNeeds();
  }

  getRequestedNeeds(){
    this.needSub=this.stockService.getAllRequestedNeeds().subscribe(need =>{this.need =  [...need];console.log(need)});
  }

  acceptNeed(id:number){
    this.stockService.getRequestedNeedById(id).subscribe(e=>{
      let n=new Need();
      n=e;
      n.status=1;
      try{
      this.stockService.updateRequestedNeed(n).subscribe();
        this.ngOnInit();
      }catch(er){

        this.ngOnInit();
      }
    });

  }

  manageNeedRequests(id:number,value:number){
    this.stockService.getRequestedNeedById(id).subscribe(e=>{
      let n=new Need();
      n=e;
      n.status=value;
      try{
        this.stockService.updateRequestedNeed(n).subscribe();
        this.ngOnInit();
      }catch(er){

        this.ngOnInit();
      }
    });

  }


  ngOnDestroy(){
    this.needSub.unsubscribe();
  }


}
