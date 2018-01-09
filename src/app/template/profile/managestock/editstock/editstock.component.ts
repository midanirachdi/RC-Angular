import { Component, OnInit } from '@angular/core';
import {Stock} from "../../../../entities/stock";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {StockService} from "../../../../services/stock.services";

@Component({
  selector: 'app-editstock',
  templateUrl: './editstock.component.html',
  styleUrls: ['./editstock.component.css'],
  providers: [StockService]
})
export class EditstockComponent implements OnInit {

  id: number;
  currentstock=new Stock();
  stockSub= new Subscription();

  constructor(private route: ActivatedRoute, private stockService: StockService,private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id=params['id'];
      this.stockService.getById(this.id).subscribe(e=>this.currentstock=<Stock>e);
    });

  }

  onSubmit() {
    this.currentstock.qteInStock=this.currentstock.qteTotal;
    this.stockSub=this.stockService.update(this.currentstock).subscribe();
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
