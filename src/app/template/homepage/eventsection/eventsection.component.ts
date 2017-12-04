import { Evenement } from '../../../entities/Evenement';
import { EvenementService } from '../../../services/evenement.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-eventsection',
  templateUrl: './eventsection.component.html',
  styleUrls: ['./eventsection.component.css'],
  providers:[EvenementService]
})
export class EventsectionComponent implements OnInit {
  evenements: Evenement[];
  constructor(private evenementService: EvenementService) { }

  ngOnInit() {
    this.getEvenements();
  }
    getEvenements(): void {
    this.evenementService.GetUpcoming()
    .subscribe(evenements => this.evenements = evenements.slice(0,3));
  }

}
