import { Evenement } from '../../../entities/Evenement';
import { EvenementService } from '../../../services/evenement.service';
import { Component, OnInit } from '@angular/core';
import { FacebookService, UIParams, UIResponse } from 'ngx-facebook';
@Component({
  selector: 'app-eventsection',
  templateUrl: './eventsection.component.html',
  styleUrls: ['./eventsection.component.css'],
  providers: [EvenementService]
})
export class EventsectionComponent implements OnInit {
  evenements: Evenement[];
  constructor(private evenementService: EvenementService, private fb: FacebookService) { }

  ngOnInit() {
    this.evenementService.GetUpcoming()
      .subscribe(rep => this.evenements=rep);
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
