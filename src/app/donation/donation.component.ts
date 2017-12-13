import { Camp } from './../entities/Camp';
import { DonationService } from './../services/donation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.css'],
})
export class DonationComponent implements OnInit {

  constructor(private donationservice: DonationService) { }
  camps: Camp[];
  url: string;
  ngOnInit() {
    this.donationservice.getCamps().subscribe(rep => this.camps = rep);
  }
  createdonation(data) {
    if (data.camp == "all") {
      this.donationservice.generatedonation(data.currency, data.amount).subscribe(rep => {
        this.url = rep['link'];
        let left = (screen.width / 2);
        let top = (screen.height / 2);
        return window.open(this.url, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, copyhistory=no, height=570,width=520,scrollbars=yes, top=' + top + ', left=' + left);
      });
    } else {
      this.donationservice.generatedonationForCamp(data.currency, data.amount, data.camp).subscribe(rep => {
        this.url = rep['link'];
        let left = (screen.width / 2);
        let top = (screen.height / 2);
        return window.open(this.url, '_blank', 'toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no, copyhistory=no, height=570,width=520,scrollbars=yes, top=' + top + ', left=' + left);
      });
    }
  }

}
