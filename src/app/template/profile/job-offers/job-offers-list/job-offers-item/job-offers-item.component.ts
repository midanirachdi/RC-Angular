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
  etat:boolean=false;

  constructor(private jobOfferService: JobofferService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((u) => {
      this.user = u;
    });
    this.role = localStorage.getItem('role');

  }

  onSelected(joboffer:Joboffer) {
    // this.etatInItem=false;

    this.jobOfferService.jobOfferSelected.emit(joboffer);
    //this.jobOfferService.jobOfferFound.emit(null);
    this.jobOfferService.bestCands.emit(this.bestCands);


  }

  onDelete(jo: Joboffer) {
    //console.log(jobOffer_id);
    this.jobOfferService.deleteJobOffer(jo.id).subscribe();
    this.jobOfferService.jobOfferDeleted.emit(jo);
  }

  onUpdate(jobOffer: Joboffer){

      this.jobOfferService.getJobOfferById(jobOffer.id).subscribe(
        (jo: Joboffer) => {
          this.etat=!this.etat;
          this.jobOfferService.jobOfferFound.emit(jo);
          this.jobOfferService.etat.emit(this.etat);

        }
      );
    this.onSelected(jobOffer);
    this.jobOfferService.jobOfferUpdated.emit(null);


  }
}
