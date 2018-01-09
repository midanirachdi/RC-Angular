import { Component, OnInit } from '@angular/core';
import {StockService} from "../../../../services/stock.services";
import {Stock} from "../../../../entities/stock";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-addstock',
  templateUrl: './addstock.component.html',
  styleUrls: ['./addstock.component.css'],
  providers: [StockService]
})
export class AddstockComponent implements OnInit {

  id: number;
  currentstock=new Stock();
  stockSub= new Subscription();

  constructor(private route: ActivatedRoute, private stockService: StockService,private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.currentstock.qteInStock=this.currentstock.qteTotal;
    this.stockService.add(this.currentstock);
    this.currentstock.qteTotal=0;
    this.currentstock.qteInStock=0;
    this.currentstock.notes=null;
    this.currentstock.stockType=null;
    this.currentstock.stockValue=0;
    this.router.navigate(['profile/managestock']);

  }
  ngOnDestroy(){
    this.stockSub.unsubscribe();
  }

}
