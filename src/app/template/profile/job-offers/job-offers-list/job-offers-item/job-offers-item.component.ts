import {Component, Input, OnInit} from '@angular/core';
import {JobofferService} from "../../../../../services/joboffer.service";
import {Joboffer} from "../../../../../entities/joboffer";
import {Response} from "@angular/http";

@Component({
  selector: 'app-job-offers-item',
  templateUrl: './job-offers-item.component.html',
  styleUrls: ['./job-offers-item.component.css']
})
export class JobOffersItemComponent implements OnInit {

  @Input() joboffer: Joboffer;
  bestCands=false;
//  @Input() etatInItem=false;

  constructor(private jobOfferService: JobofferService) {
  }

  ngOnInit() {


  }

  onSelected() {
   // this.etatInItem=false;
    this.jobOfferService.jobOfferSelected.emit(this.joboffer);
    this.jobOfferService.bestCands.emit(this.bestCands);
  }

  onDelete(jobOffer: Joboffer) {
    //console.log(jobOffer_id);
    this.jobOfferService.deleteJobOffer(jobOffer.id).subscribe();

  }
}
