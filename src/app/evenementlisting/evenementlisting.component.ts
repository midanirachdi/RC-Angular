import { Component, OnInit } from '@angular/core';
import { Evenement } from '../entities/Evenement';
import { EvenementService } from '../services/evenement.service';
@Component({
  selector: 'app-evenementlisting',
  templateUrl: './evenementlisting.component.html',
  styleUrls: ['./evenementlisting.component.css'],
  providers: [EvenementService]
})
export class EvenementlistingComponent implements OnInit {

  evenements: Evenement[];
  constructor(private evenementService: EvenementService) { }

  ngOnInit() {
    this.getEvenements();
  }

    getEvenements(): void {
    this.evenementService.GetAllEvenements()
      .subscribe(evenements => this.evenements = evenements);
  }

}
