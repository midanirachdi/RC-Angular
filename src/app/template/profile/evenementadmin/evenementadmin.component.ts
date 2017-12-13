import { User } from './../../../entities/User';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { EvenementService } from './../../../services/evenement.service';
import { Evenement } from './../../../entities/Evenement';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evenementadmin',
  templateUrl: './evenementadmin.component.html',
  styleUrls: ['./evenementadmin.component.css'],
  providers: [DatePipe]
})
export class EvenementadminComponent implements OnInit {
  mesevenements: Evenement[];
  idcampchef: number;
  evenement: Evenement = { 'name': null , 'location': null ,
                       'imagename': null, 'dateEvent': null , 'nbplace': null,
                       'description': null , 'id': null
                      };
  // Evenement Reactive form
  EventAddForm= new FormGroup({
    eventname : new FormControl('', Validators.required),
    location : new FormControl('', Validators.required),
    capacity : new FormControl('', Validators.required),
    dateEvent : new FormControl('', Validators.required),
    description : new FormControl('', Validators.required),
  });
  constructor(private evenementService: EvenementService, private userService: UserService,private datePipe:DatePipe) { }

  ngOnInit() {
    this.userService.getMe().subscribe(rep => {
      this.mesevenements = rep['CampChef'].events;
      this.idcampchef=rep['CampChef'].id;
    });
  }
  DoDeleteEvent(e: Evenement) {
    this.evenementService.delete(e).subscribe(
      ()=>this.mesevenements.filter(x => x.id != e.id)
    );
  }

  DoAddEvent() {
    this.evenement.name = this.EventAddForm.value.eventname;
    this.evenement.location = this.EventAddForm.value.location;
    this.evenement.dateEvent = this.datePipe.transform(this.EventAddForm.value.bd, 'yyyy-MM-dd HH:mm');
    this.evenement.nbplace = this.EventAddForm.value.capacity;
    this.evenement.description = this.EventAddForm.value.description;
    this.evenementService.AddEvenement(this.evenement).subscribe(
      () =>  {     this.mesevenements.push(Object.assign({}, this.evenement));
      this.evenement = {'name': null , 'location': null ,
                       'imagename': null, 'dateEvent': null , 'nbplace': null,
                       'description': null , 'id': null };
    });
  }

}
