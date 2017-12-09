import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobofferService} from "../../../../../services/joboffer.service";
import {Joboffer} from "../../../../../entities/joboffer";
import {AuthService} from "../../../../../services/auth.service";
import {User} from "../../../../../entities/User";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-job-offers-item',
  templateUrl: './job-offers-item.component.html',
  styleUrls: ['./job-offers-item.component.css']
})
export class JobOffersItemComponent implements OnInit {

  @Input() joboffer: Joboffer;
  //@Output() jobOfferDeleted =new EventEmitter<Joboffer>();
  //@Output() jobOfferUpdated =new EventEmitter<Joboffer>();
  bestCands = false;
//  @Input() etatInItem=false;

  userSub: Subscription;
  user: User;
  role: string;
  etat=false;

  constructor(private jobOfferService: JobofferService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((u) => {
      this.user = u;
    });
    this.role = localStorage.getItem('role');

  }

  onSelected() {
    // this.etatInItem=false;
    this.jobOfferService.jobOfferSelected.emit(this.joboffer);
    this.jobOfferService.bestCands.emit(this.bestCands);

  }

  onDelete(jo: Joboffer) {
    //console.log(jobOffer_id);
    this.jobOfferService.deleteJobOffer(jo.id).subscribe();
    this.jobOfferService.jobOfferDeleted.emit(jo);
  }

  onUpdate(jobOffer: Joboffer){

      this.jobOfferService.getJobOfferById(jobOffer.id).subscribe(
        (jobOffer: Joboffer) => {
          this.etat=!this.etat;
          this.jobOfferService.jobOfferFound.emit(jobOffer);
          this.jobOfferService.etat.emit(this.etat);

        }
      );
    this.jobOfferService.jobOfferUpdated.emit(jobOffer);


  }
}
