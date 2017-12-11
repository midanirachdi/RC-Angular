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

  constructor(private route: ActivatedRoute, private evenementService: EvenementService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.evenementService.GetEvenement(this.id).subscribe(rep=>this.evenement=rep);
  }

}
