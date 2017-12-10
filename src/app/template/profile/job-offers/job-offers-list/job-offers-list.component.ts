import {Component, OnInit} from '@angular/core';
import {JobofferService} from "../../../../services/joboffer.service";
import {Joboffer} from "../../../../entities/joboffer";
import {User} from "../../../../entities/User";
import {AuthService} from "../../../../services/auth.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-job-offers-list',
  templateUrl: './job-offers-list.component.html',
  styleUrls: ['./job-offers-list.component.css']
})
export class JobOffersListComponent implements OnInit {
  jobOffers: Joboffer[];
  titleToSearch: string;
  etat = false;

  userSub:Subscription;
  user:User;
  role:string;
  constructor(private jobOfferService: JobofferService,private authService:AuthService) {
  }

  ngOnInit() {
    this.getJO();
    this.userSub=this.authService.user.subscribe((u)=>{
      this.user=u;
    });
    this.role=localStorage.getItem('role');
    this.jobOfferService.jobOffersDetailList.subscribe(
      (jobOffers:Joboffer[])=>{
        this.jobOffers=jobOffers;
        this.jobOffers=this.jobOffers.slice();
      }
    );
    this.jobOfferService.jobOfferAdded.subscribe(
      (jo:Joboffer)=>
        this.jobOffers.splice(0,0,jo)
  );
    this.jobOfferService.jobOfferDeleted.subscribe(
      (jo:Joboffer)=>{

        this.jobOffers.splice(this.jobOffers.indexOf(jo),1);
      }
    );
    this.jobOfferService.jobOfferUpdated.subscribe(
      (jo:Joboffer)=>{
        this.etat = !this.etat;
        //this.jobOfferService.etat.emit(this.etat);
        this.jobOfferService.jobOffers.emit(this.jobOffers);
      }
    );

    this.jobOfferService.jobOffers.subscribe(
      (joboffers:Joboffer[])=>
        this.jobOffers=joboffers
    )
  }
  getJO() {
    this.jobOfferService.getAllJobOffers().subscribe(
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
