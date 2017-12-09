import {Component, Input, OnInit} from '@angular/core';
import {Joboffer} from "../../../../entities/joboffer";
import {JobofferService} from "../../../../services/joboffer.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Refugee} from "../../../../entities/refugee";
import {User} from "../../../../entities/User";
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-job-offers-detail',
  templateUrl: './job-offers-detail.component.html',
  styleUrls: ['./job-offers-detail.component.css'],
  providers:[DatePipe]
})
export class JobOffersDetailComponent implements OnInit {
  @Input() etatInDetail:boolean;
  @Input() joInDetail: Joboffer;
  bestCands=false;
  userSub:Subscription;
  user:User;
  role:string;

  refugees:Refugee[];

  jobOfferFound: Joboffer = null;

  constructor(private jobofferService:JobofferService,private datePipe: DatePipe,private authService:AuthService) { }

  ngOnInit() {
    this.jobofferService.bestCands.subscribe(
      (bestCands: boolean) => {
        this.bestCands = bestCands;
      }
    );
    this.userSub=this.authService.user.subscribe((u)=>{
      this.user=u;
    });
    this.role=localStorage.getItem('role');
  }
  jobofferForm = new FormGroup({
    title: new FormControl('', Validators.required),
    contactN: new FormControl('', Validators.required),
    companyN: new FormControl('', Validators.required),
    companyA: new FormControl('', Validators.required),
    contactE: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
    bd: new FormControl('', Validators.required),
    ed: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    fow: new FormControl('', Validators.required),
    salaryE: new FormControl('', Validators.required)
  });
  onSubmit() {
    const newJobOffer = new Joboffer(
      this.jobofferForm.value.desc,
      this.datePipe.transform(this.jobofferForm.value.bd, 'yyyy-MM-dd'),
      this.datePipe.transform(this.jobofferForm.value.ed, 'yyyy-MM-dd'),
      this.jobofferForm.value.contactNumber,
      this.jobofferForm.value.fow,
      this.jobofferForm.value.salaryE,
      this.jobofferForm.value.companyN,
      this.jobofferForm.value.companyA,
      this.jobofferForm.value.contactE,
      this.jobofferForm.value.contactN,
      this.jobofferForm.value.title);
    console.log(newJobOffer);
    if(this.jobOfferFound === null){
      console.log('triple');
      this.jobofferService.addJobOffer(newJobOffer).subscribe();
    }
    else{
      newJobOffer.id=this.jobOfferFound.id;
      this.jobofferService.updateJobOffer(newJobOffer).subscribe();

    }
  }
  getBestCandsEmail(joboffer_id:number){

    this.bestCands = !this.bestCands;

    this.jobofferService.getBestCandidatesAndEmailThem(joboffer_id).subscribe(
      (refugees:Refugee[])=>{
        this.refugees=refugees
      }
    );
  }
}
