import { Component, OnInit } from '@angular/core';
import {StockService} from "../../../services/stock.services";
import {ActivatedRoute} from "@angular/router";
import {Stock} from "../../../entities/stock";
import {Subscription} from "rxjs";
import {Need} from "../../../entities/need";
import {StockNotification} from "../../../entities/stock-notification";

@Component({
  selector: 'app-managestock',
  templateUrl: './managestock.component.html',
  styleUrls: ['./managestock.component.css'],
  providers: [StockService]
})
export class ManagestockComponent implements OnInit {

  stock: Stock[]= new Array();
  notifications:StockNotification[]=new Array();

  stockSub:Subscription;
  constructor(private stockService: StockService,private route: ActivatedRoute) { this.ngOnInit();}

  ngOnInit() {
    this.getStock();
    this.getNotifications();
  }

  getStock(){
    this.stockSub=this.stockService.getAllNews().subscribe(stock =>{this.stock =  [...stock];console.log(stock)});

  }

  deleteStock(id:number){
    console.log(id);
    this.stockService.getById(id).subscribe((e)=>{
      let s=<Stock> e;
      try{
        this.stockSub= this.stockService.delete(s).subscribe(e=>{
        this.getStock();
        });
      }catch(e){
        this.getStock();
        }
    });
  }
  getNotifications(){
    this.stockService.getAllNotifications().subscribe(res=>this.notifications=res);
  }

  ngOnDestroy(){
    this.stockSub.unsubscribe();
  }

}
