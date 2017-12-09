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
