import { UIParams, FacebookService, UIResponse } from 'ngx-facebook';
import { UserService } from './../services/user.service';
import { User } from './../entities/User';
import { Evenement } from './../entities/Evenement';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from '../services/evenement.service';
@Component({
  selector: 'app-evenementdetails',
  templateUrl: './evenementdetails.component.html',
  styleUrls: ['./evenementdetails.component.css'],
  providers: [EvenementService]
})
export class EvenementdetailsComponent implements OnInit {
  id: number;
  private sub: any;
  evenement:Evenement;
  idvolunteer:number;
  note : string="";
  role:string;
  constructor(private fb: FacebookService,private route: ActivatedRoute, private evenementService: EvenementService,private userservice:UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.evenementService.GetEvenement(this.id).subscribe(rep=>this.evenement=rep);
    this.evenementService.getNote(this.id).subscribe(rep => this.note= rep);
    this.role=localStorage.getItem('role');
  }

  handleRate(e){
    this.userservice.getMe().subscribe(rep => this.idvolunteer=rep['Volunteer'].id);
    console.log(this.id+" "+ e.value);
    console.log(this.idvolunteer);
    this.evenementService.rateEvenement(this.idvolunteer,this.id,e.value).subscribe(t => {
      console.log(t);
    });
  }

  faceshare(url: string) {

    let params: UIParams = {
      href: url,
      method: 'share'
    };

    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));
  }

}
