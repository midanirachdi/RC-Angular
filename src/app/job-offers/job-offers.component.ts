import {Component, OnInit} from '@angular/core';
import {Joboffer} from "../entities/joboffer";
import {Refugee} from "../entities/refugee";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {JobofferService} from "../services/joboffer.service";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css'],
  providers: [DatePipe]
})
export class JobOffersComponent implements OnInit{

  jobOffers: Joboffer[];
  refugees:Refugee[];
  jobOfferFound: Joboffer = null;
 // user:User;
 // userSub:Subscription;

  etat = false;
  etat2 = false;
  etat3 = false;
  error = '';
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

  constructor(private jobOfferService: JobofferService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    /*this.userService.getAllUsers().subscribe(
      (resp: Response) => {
        console.log(resp.json());
      }
    );*/
  }

  getAll() {
    this.etat = !this.etat;
    this.jobOfferService.getAllJobOffers().subscribe(
      (joboffers: Joboffer[]) => {
        //console.log(resp.json());
        /*for (let i=0;i<resp.json().length;i++){
        console.log(resp.json()[i].districtchef.DistrictChef.firstName);
        }*/
        this.jobOffers = joboffers;
      },
      (error) => {
        this.error = error
      },
    );
  }

  getById(id: number) {
    this.etat = !this.etat;
    this.jobOfferService.getJobOfferById(id).subscribe(
      (jobOffer: Joboffer) => {
        this.jobOffers = Array.of(jobOffer);
      },
      (error) => {
        this.error = error
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

  deleteJO(id: number) {
    this.etat = !this.etat;
    this.jobOfferService.deleteJobOffer(id);
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
    console.log(newJobOffer);
    if(this.jobOfferFound === null){
      console.log('triple');
      this.jobOfferService.addJobOffer(newJobOffer).subscribe();
    }
    else{
      newJobOffer.id=this.jobOfferFound.id;
      this.jobOfferService.updateJobOffer(newJobOffer).subscribe();

    }
  }

  showUpdate(id: number) {

    console.log();

    this.jobOfferService.getJobOfferById(id).subscribe(
      (jobOffer: Joboffer) => {
        this.jobOfferFound = jobOffer;
        this.etat2 = !this.etat2;
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

    console.log(this.jobOfferFound);

  }
  getBestCandsEmail(jobOffer_id:number){
    this.etat3=!this.etat3;
    this.jobOfferService.getBestCandidatesAndEmailThem(jobOffer_id).subscribe(
      (refugees:Refugee[])=>{
        this.refugees=refugees
      }
    );
  }



}
