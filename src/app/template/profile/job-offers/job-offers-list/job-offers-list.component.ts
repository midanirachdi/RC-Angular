import {Component, OnInit} from '@angular/core';
import {JobofferService} from "../../../../services/joboffer.service";
import {Joboffer} from "../../../../entities/joboffer";

@Component({
  selector: 'app-job-offers-list',
  templateUrl: './job-offers-list.component.html',
  styleUrls: ['./job-offers-list.component.css']
})
export class JobOffersListComponent implements OnInit {
  jobOffers: Joboffer[];
  titleToSearch: string;
  etat = false;

  constructor(private jobOfferService: JobofferService) {
  }

  ngOnInit() {
    this.getJO();
  }

  getJO() {
    this.jobOfferService.getAllJobOffers().subscribe(
      (joboffers: Joboffer[]) => {
        this.jobOffers = joboffers;

      }
    );
  }

  onDeleteJo(jobofferz: Joboffer[]) {
    this.jobOfferService.jobOffers.subscribe(
      (joboffers: Joboffer[]) => {
        this.jobOffers = joboffers;
      }
    );
  }

  showAddForm() {
    this.etat = !this.etat;
    this.jobOfferService.etat.emit(this.etat);
  }

}
