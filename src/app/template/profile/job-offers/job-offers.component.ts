import {JobofferService} from "../../../services/joboffer.service";
import {Component, OnInit} from '@angular/core';
import {Joboffer} from "../../../entities/joboffer";
import {Refugee} from "../../../entities/refugee";


@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit{

  joSelected: Joboffer = null;
  jobOffers: Joboffer[];
  refugees:Refugee[];
  jobOfferFound: Joboffer = null;
  displayDetail = false;
 // user:User;
 // userSub:Subscription;

  etat =false;
  error = '';


  constructor(private jobOfferService: JobofferService) {
  }

  ngOnInit() {
    this.jobOfferService.jobOfferSelected.subscribe(
      (jo: Joboffer) => {
        this.joSelected = jo;
        // lol =>this.etat=true;
      }
    );
    this.jobOfferService.jobOfferFound.subscribe(
      ()=>this.jobOfferService.jobOfferSelected.subscribe(
        (jo:Joboffer)=>this.joSelected=null
      )
    );
      this.jobOfferService.etat.subscribe(
      (etat:boolean)=>{
        this.etat=etat;
        if(this.etat==true)
        {    this.joSelected=null}
      }
    );
  }

  getByDcId(id: number) {
    this.etat = !this.etat;
    this.jobOfferService.getJobOffersByDistrictChiefId(id).subscribe(
      (joboffers: Joboffer[]) => {
        this.jobOffers = joboffers;
      },
      (error) => {
        this.error = error
      }
    );
  }


}
