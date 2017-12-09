import {Component, Input, OnInit} from '@angular/core';
import {Joboffer} from "../../../../entities/joboffer";
import {JobofferService} from "../../../../services/joboffer.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {Refugee} from "../../../../entities/refugee";
import {User} from "../../../../entities/User";
import {Subscription} from "rxjs/Subscription";
import {AuthService} from "../../../../services/auth.service";
import {SpeechService} from "../../../../services/speech.service";

@Component({
  selector: 'app-job-offers-detail',
  templateUrl: './job-offers-detail.component.html',
  styleUrls: ['./job-offers-detail.component.css'],
  providers:[DatePipe]
})
export class JobOffersDetailComponent implements OnInit {
  @Input() etatInDetail:boolean =false;
  @Input() joInDetail: Joboffer;
  jobOffers:Joboffer[];
  jobOfferAdded:Joboffer;
  bestCands=false;
  etatMic=false;
  speechData: string;


  userSub:Subscription;
  user:User;
  role:string;


  refugees:Refugee[];

  jobOfferFound: Joboffer = null;
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

  constructor(
    private jobofferService:JobofferService,
    private datePipe: DatePipe,
    private authService:AuthService,
    private speechService:SpeechService) { }

  ngOnInit() {
    this.jobofferService.bestCands.subscribe(
      (bestCands: boolean) => {
        this.bestCands = bestCands;
      }
    );
    this.jobofferService.jobOfferFound.subscribe(
      (jobOfferFound:Joboffer)=>
      {
        this.jobOfferFound=jobOfferFound;
        this.jobofferForm.setValue({
          'title': this.jobOfferFound.title,
          'contactN': this.jobOfferFound.contactName,
          'companyN': this.jobOfferFound.companyName,
          'companyA':this.jobOfferFound.companyAdress,
          'contactE':this.jobOfferFound.contactEmail,
          'desc':this.jobOfferFound.description,
          'bd':this.jobOfferFound.begindate,
          'ed':this.jobOfferFound.enddate,
          'contactNumber':this.jobOfferFound.contactnumber,
          'fow':this.jobOfferFound.fieldOfWork,
          'salaryE':this.jobOfferFound.salaryEstimate
        });
      }
    );

    this.jobofferService.etat.subscribe(
      (etatUpdate:boolean)=> {
        this.etatInDetail=etatUpdate;

      }
    );

    this.jobofferService.jobOffers.subscribe(
      (joboffers:Joboffer[])=>this.jobOffers=joboffers
    );
    this.userSub=this.authService.user.subscribe((u)=>{
      this.user=u;
    });
    this.role=localStorage.getItem('role');
  }
  switchState(){
    this.etatMic=!this.etatMic;
    if(this.etatMic==true){
    this.speechService.record().subscribe(
      (value)=>{
        this.speechData = value;
        console.log(value);
      }
    );
    }
    else{
      this.speechService.DestroySpeechObject();
      this.etatMic=false;
    }
  }


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

    if(this.jobOfferFound === null){
      console.log('Adding a job offer');
      this.etatInDetail = false;

      this.jobofferService.addJobOffer(newJobOffer).subscribe(
        (jobOfferAdded:Joboffer)=>{
          this.jobofferService.jobOffersDetailList.emit(this.jobOffers);
          this.jobOfferAdded=jobOfferAdded;

        }
    );
      this.jobofferService.jobOfferAdded.emit(this.jobOfferAdded);



    }
    else{
      newJobOffer.id=this.jobOfferFound.id;

      this.jobofferService.updateJobOffer(newJobOffer).subscribe(
        (jobOfferUpdated:Joboffer)=>{
          this.jobOffers.splice(this.jobOffers.indexOf(newJobOffer),1,jobOfferUpdated);
          this.jobofferService.jobOffers.emit(this.jobOffers);
          console.log(jobOfferUpdated);
        }
      );
      this.etatInDetail=false;


    }
  }
  getBestCandsEmail(joboffer_id:number){



    this.jobofferService.getBestCandidatesAndEmailThem(joboffer_id).subscribe(
      (refugees:Refugee[])=>{
        this.refugees=refugees
      }
    );
    this.bestCands = !this.bestCands;
  }
}
