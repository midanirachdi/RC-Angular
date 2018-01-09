import {JobofferService} from "../../../services/joboffer.service";
import {Component, OnInit} from '@angular/core';
import {Joboffer} from "../../../entities/joboffer";
import {Refugee} from "../../../entities/refugee";
import {User} from "../../../entities/User";
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../../services/auth.service";


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

  userSub:Subscription;
  user:User;
  role:string;
  constructor(private jobOfferService: JobofferService,private authService:AuthService) {
  }

  ngOnInit() {
    this.userSub=this.authService.user.subscribe((u)=>{
      this.user=u;
    });
    this.role=localStorage.getItem('role');
    this.jobOfferService.jobOfferSelected.subscribe(
      (jo: Joboffer) => {
        this.joSelected = jo;
        //fixed finally ~~~~~~~~~
        this.jobOfferFound=null;
        this.etat=false;
        console.log(this.jobOfferFound);
      }
    );
    this.jobOfferService.jobOfferFound.subscribe(
      (jo:Joboffer)=>{
        this.jobOfferFound=jo;
      }

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
